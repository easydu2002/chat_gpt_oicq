
export const config = {

  adminQQ: 0,
  botQQ: 0,
  botPassword: '',

  // handler config...
  officialAPI: {

    enable: true,
    key: '',
    model: 'text-davinci-003',
    identity: [],
    maxTokens: 256,
    maxTrackCount: 1,
    temperature: 0.9,
    stop: ['Humen', 'AI']
  },
  api: {

    enable: false,
    email: '',
    password: '',
    browserPath: ''
  }
}
