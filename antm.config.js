console.log('----------', process.env.TENCENT_SECRET_ID, process.env.TENCENT_SECRET_KEY)
module.exports = {
  iconfont: {
    src: '//at.alicdn.com/t/c/font_4986210_esjvjf9a65f.js',
    fontFamily: 'iconfont',
    fontClassPrefix: 'icon',
    typescript: true,
    components: './src/components/icon',
    style: './src/iconfont.scss',
    defaultSize: 48,
    defaultColor: '#969799',
  },
  uploadTencent: {
    CDN: 'g.18qjz.cn',
    SecretId: `${process.env.TENCENT_SECRET_ID}`,
    SecretKey: `${process.env.TENCENT_SECRET_KEY}`,
    Bucket: 'sbqfc-1307862547',
    Region: 'ap-shanghai',
  },
}
