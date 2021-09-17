import DmdViewPicture from './dmd-view-picture'

const obj = {}

obj.install = function (Vue) {
    const viewContrustor = Vue.extend(DmdViewPicture)
    const viepic = new viewContrustor()
    viepic.$mount(document.createElement('div'))
    document.body.appendChild(viepic.$el)
    Vue.prototype.$DmdViewPictrue = viepic
    viepic.$nextTick(()=>{
        viepic.initDrag()
    })
    viepic.ondragstart = function() {
        return false;
      };
}

export default obj