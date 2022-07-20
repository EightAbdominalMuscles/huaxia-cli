const request = require('@huaxia-cli/request')

module.exports = async function () {
  return request({
    url: '/project/template'
  })
}
