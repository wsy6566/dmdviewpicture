<template>
  <div class="dmd-view-pic-box" v-show="isShow" id="dmd-view-pic-box">
    <img :src="url" class="img-el" @error="error" v-show="isShow && !notFinish" id="imgEl" ref="imgEl"  @load="finishLoad" @loadeddata="test"/>
    <Loading v-if="notFinish"></Loading>
    <Error v-if="errorStatus"></Error>
    <footer>
        <span @click="scaleBigImg">放大</span><span @click="scaleSmallImg">缩小</span><span @click="roateImg">旋转</span><span @click="original">还原</span><span @click="close">关闭</span>
    </footer>
  </div>
</template>
<script>
import Loading from './loading.vue'
import Error from './error.vue'
export default {
  name: "DmdViewPicture",
  components:{
    Loading
  },
  data() {
    return {
      notFinish:true,
      message: "",
      isShow: false,
      url: "",
      deg:0,
      sle:1,
      errorStatus:false
    };
  },
  mounted() {
  },
  methods: {
    error(){
      this.errorStatus = true
    },
    test(){
     

    },
    finishLoad(){
      this.notFinish = false
    },
    original(){
      //还原
       this.$refs.imgEl.style.transform = `rotate(0deg) scale(1)`
      this.deg = 0
      this.sle = 1
    },
    scaleSmallImg() {
      //缩小
      this.sle -= 0.2
      if (this.sle <= 0.5) {
        this.sle = 0.5
      }
      this.$refs.imgEl.style.transform = `rotate(${this.deg}deg) scale(${this.sle})`
    },
    
    scaleBigImg() {
      //放大
      this.sle += 0.2
      if (this.sle >= 2) {
        this.sle = 2
      }
      this.$refs.imgEl.style.transform = `rotate(${this.deg}deg) scale(${this.sle})`
    },
    roateImg(){
      //旋转
     this.deg += 90
      this.$refs.imgEl.style.transform = `rotate(${this.deg}deg) scale(${this.sle})`
    },
    show(url, duration = 2000) {
      this.isShow = true;
      this.url = url+'?'+Math.round(Math.random());
      this.initDrag()
    },
    close(e) {
      this.isShow = false;
       this.notFinish = true;
      this.$refs.imgEl.style.transform = `rotate(0deg) scale(1)`
      this.deg = 0
      this.sle = 1
         let drag = document.getElementById("dmd-view-pic-box")
      let imgEl = document.getElementById("imgEl")
      drag.style.left = '50%'
      imgEl.style.left = '50%'
      this.errorStatus = false
    },
    initDrag() {
      let drag = document.getElementById("dmd-view-pic-box")
      let imgEl = document.getElementById("imgEl")
     
      imgEl.onmousedown = function (event) {
        console.log("onmousedown  is running");
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          console.log("moveAt  is running");
          imgEl.style.left = pageX + "px";
          imgEl.style.top = pageY + "px";
            drag.style.left = pageX + "px";
          drag.style.top = pageY + "px";
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
        // 在 mousemove 事件上移动球
        document.addEventListener("mousemove", onMouseMove);
        // 放下球，并移除不需要的处理程序
        imgEl.onmouseup = function () {
          console.log("drag onmouseup is running");
          document.removeEventListener("mousemove", onMouseMove);
          imgEl.onmouseup = null;
          drag.onmouseup = null;
        };
        imgEl.ondragstart = function () {
          return false;
        };
          drag.ondragstart = function () {
          return false;
        };
      };
    },
  },
};
</script>
<style scoped>
.dmd-view-pic-box {
      text-align: center;
    vertical-align: middle;
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3px 3px;
  color: aliceblue;

  z-index: 9999;

}
.img-el {
  max-width: 80vw;
  max-height: 90vh;
  cursor: pointer;
}
.dmd-view-pic-box > span {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url("data:image/png;base64,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");
  position: absolute;
  top: -18px;
  right: -18px;
  z-index: 99999;
  border: 1px solid gray;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
footer{
  padding: 10px;
  text-align: center;
  position: relative;
      background-color: rgba(0,0,0,0.3);
    border-radius: 9px;
      margin-top: 5px;
}
footer span{
  display: inline-block;
  width:70px;
  padding:0px 5px;
  text-align: center;
  margin:0px 5px;
  border:1px solid white;
  line-height: 28px;
  border-radius: 4px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  -webkit-user-select:none;
  user-select:none;

}
.img-el{
  transition: 1s;
  transform-origin: center;
  transform:rotate(0deg) scale(1);
  border-radius: 4px;
}
</style>