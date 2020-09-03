export default [
  {
    category: 'filter_function',
    display_name: 'Filter by Time',
    info: '',
    inports: ['fil_datasrc'],
    module: '',
    outports: ['filtime'],
    properties: {},
    backgroundColor: '#C5E0B4'
  },
  {
    category: 'filter_function',
    display_name: 'Filter by Range',
    info: '',
    inports: ['fil_datasrc'],
    module: '',
    outports: ['filrange'],
    properties: {},
    backgroundColor: '#C5E0B4'
  },
  {
    category: 'filter_function',
    display_name: 'Filter by Count',
    info: '',
    inports: ['fil_datasrc'],
    module: '',
    outports: ['filcount'],
    properties: {},
    backgroundColor: '#C5E0B4'
  },
  {
    category: 'loop_function',
    display_name: 'Loop',
    info: '',
    inports: ['loop_datasrc'],
    module: '',
    outports: ['loop'],
    properties: {},
    backgroundColor: '#BAD5ED'
  },
  {
    category: 'arima',
    display_name: 'ARIMA (single step)',
    info: '',
    inports: ['arima_datasrc'],
    module: '',
    outports: ['arimastep'],
    properties: {},
    backgroundColor: '#C9B0DB'
  },
  {
    category: 'arima',
    display_name: 'ARIMA (multi step)',
    info: '',
    inports: ['arima_datasrc'],
    module: '',
    outports: ['arimastep'],
    properties: {},
    backgroundColor: '#C9B0DB'
  },
  {
    category: 'send_function',
    display_name: 'Send SMS Alert',
    info: '',
    inports: ['send_datasrc'],
    module: '',
    outports: [],
    properties: {},
    backgroundColor: '#FF9E9E'
  },
  {
    category: 'send_function',
    display_name: 'Send Email Alert',
    info: '',
    inports: ['send_datasrc'],
    module: '',
    outports: [],
    properties: {},
    backgroundColor: '#FF9E9E'
  },
  {
    category: 'send_function',
    display_name: 'Send Whatsapp Alert',
    info: '',
    inports: ['send_datasrc'],
    module: '',
    outports: [],
    properties: {},
    backgroundColor: '#FF9E9E'
  },
  {
    category: 'condition_function',
    display_name: 'Data Condition',
    info: '',
    inports: ['condition_datasrc'],
    module: '',
    outports: ['true', 'false'],
    properties: {},
    backgroundColor: '#FEECB2'
  },
  {
    category: 'do_nothing_function',
    display_name: 'Do Nothing',
    info: '',
    inports: ['dn_datasrc'],
    module: '',
    outports: [],
    properties: {},
    backgroundColor: '#A5A5A5'
  }
]
