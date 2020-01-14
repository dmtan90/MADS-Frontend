<template>
  <div></div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      editor: 'https://www.draw.io/?embed=1&ui=atlas&spin=1&proto=json',
      iframe: null,
      draft: null,
      name: 'site-digital-twin'
    }
  },
  methods: {
		edit() {
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('frameborder', '0');
			this.iframe.setAttribute('width', '100%');
			this.iframe.setAttribute('height', '100%');
      this.iframe.setAttribute('src', this.editor);

      let draft = localStorage.getItem('.draft-' + this.name);
      if(draft) {
				this.draft = JSON.parse(draft);
      }			

			window.addEventListener('message', this.receive);
			document.body.appendChild(this.iframe);
    },
    receive(evt) {
      if (evt.data.length > 0)
      {
        var msg = JSON.parse(evt.data);
        
        if (msg.event == 'init'){
          if (this.draft != null){
            this.iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
              autosave: 1, xml: this.draft.xml}), '*');
            this.iframe.contentWindow.postMessage(JSON.stringify({action: 'status',
              modified: true}), '*');
          }else
          {
            this.iframe.contentWindow.postMessage(JSON.stringify({action: 'load',
              autosave: 1, xml: ''}), '*');
          }
        }
        else if (msg.event == 'export'){
          // localStorage.setItem(this.name, JSON.stringify({lastModified: new Date(), data: msg.data}));
          // localStorage.removeItem('.draft-' + this.name);
          // this.draft = null;
          // this.close();
        }
        else if (msg.event == 'autosave'){
          localStorage.setItem('.draft-' + this.name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
        }
        else if (msg.event == 'save'){
          // this.iframe.contentWindow.postMessage(JSON.stringify({action: 'export',
          //   format: 'xmlpng', xml: msg.xml, spin: 'Updating page'}), '*');
          localStorage.setItem('.draft-' + this.name, JSON.stringify({lastModified: new Date(), xml: msg.xml}));
        }
        else if (msg.event == 'exit'){
          this.draft = null;
          this.close();
        }
      }
    },
    close() {
      window.removeEventListener('message', this.receive);
      window.close();
			// document.body.removeChild(this.iframe);
    }
  },
  mounted() {
    this.edit();
  }
}
</script>
