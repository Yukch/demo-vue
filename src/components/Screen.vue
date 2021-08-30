<template>
  <div>
    <!-- <el-slider v-model="value" :show-tooltip="false" class="slider" vertical></el-slider> -->
        <!-- <div v-show="imgShow">
            <img :src="img" alt="" class="screenShot" @load="imgGet" ref="screenShot">    
        </div> -->
        <canvas id="screenCanvas" height="1800" width="2880">
            
        </canvas>

        <img :src="img" alt="" 
                :class="{screenShot:true, hidden: !imgShow}" @load="imgLoaded" ref="screenShot" />
            <!-- <div slot="error" class="image-slot">
            </div> -->


        <el-row :gutter="25" class="xyRow">
            <el-col :span="5">
                <el-input v-model="ty" size="small" clearable maxlength="4" class="xyInput">
                    <!-- <template slot="prepend">X:</template> -->
                </el-input>
            </el-col>
            <el-col :span="5">
                <el-input v-model="x" size="small" clearable maxlength="4" class="xyInput">
                    <!-- <template slot="prepend">X:</template> -->
                </el-input>
            </el-col>

            <el-col :span="12" class="buttonCol">
                <el-button @click="xy" size="small" class="moveButton">Move</el-button>
                <el-button @click="xyDbClick" size="small" class="clickButton">2Click</el-button>
            </el-col>

        </el-row>

        <el-row :gutter="25" class="xyRow">
            <el-col :span="12" class="buttonCol">
                <el-button @click="xyClick('left')" size="small" class="clickButton">LClick</el-button>
                <el-button @click="xyClick('right')" size="small" class="clickButton">RClick</el-button>
            </el-col>
        </el-row>

        <el-row :gutter="25" class="sliderRow">
            <el-col :span="4">
                <el-slider
                    v-model="y"
                    vertical
                    :show-tooltip="false"
                    height="220px"
                    :max="1800"
                    class="ySlider"
                    @input="drawXYLine">
                </el-slider>
            </el-col>
            <el-col :span="20">
                <el-slider
                    v-model="x"
                    :show-tooltip="false"
                    :max="2880"
                    class="xSlider"
                    @input="drawXYLine">
                </el-slider>
            </el-col>
        </el-row>


        <el-button :icon="refreshButtonIcon"
            ref="refreshButton"
            circle v-bind:class="{refreshButton: true}" @click="imgGet">
        </el-button>                      

  </div>
</template>

<script>
export default {
  name: 'Screen',
  data () {
    return {
      value: 0,
      img: '',
      imgShow: false,
      isLoading: false,
      x: 1440,
      y: 900
    }
  },
  computed: {
        refreshButtonIcon: function () {
            if(this.isLoading) {
                return 'el-icon-loading'
            } 
            return 'el-icon-refresh-right'
        },
        ty: {
            get() {
                return 1800 - this.y;
            },
            set() {
                this.y = 1800 - ty
            }
        }
  },
  watch: {
      y: (val, oldVal) => {
        //   this.y = 1800 - val
      }
  },
  mounted() {
        this.img = '/api/img'
        this.isLoading = true
  },
  methods: {
    hello () {
        this.$axios.get('/api/hello').then((response)=>{
            console.log(response);
            this.value = response.data
        })
    },
    imgGet(e) {
        // var screenCanvas = document.getElementById('screenCanvas')
        // var ctx = screenCanvas.getContext('2d');
        // var img = new Image();   // 创建img元素
        // var _this = this
        // img.onload = function(){
        //     ctx.clearRect(0, 0, 2880, 1800)
        //     ctx.drawImage(img, 0, 0, 2880, 1800)
        //     _this.isLoading = false
        // }
        // img.src = '/api/img?' + Math.random()
        this.img = '/api/img?' + Math.random()
        this.isLoading = true
    },
    imgLoaded() {
        console.log('图片加载完成')
        this.imgShow = true;
        this.isLoading = false;
    },
    xy() {
        var _this = this
        this.$axios.post('/api/xy', "x=" + _this.x + "&y=" + _this.ty).then((response)=>{
            console.log(response)
        })
    },
    xyClick(hand) {
        var _this = this
        //左键点击
        this.$axios.post('/api/xyClick',"x=" + _this.x + 
                                        "&y=" + _this.ty +
                                        "&hand=" + hand).then((response)=>{
            console.log(response)
        })
    },
    xyDbClick() {
        var _this = this
        //左键点击
        this.$axios.post('/api/xyDbClick',"x=" + _this.x + 
                                        "&y=" + _this.ty).then((response)=>{
            console.log(response)
        })
    },
    drawXYLine() {
        var screenCanvas = document.getElementById('screenCanvas')
        var ctx = screenCanvas.getContext('2d');

        ctx.clearRect(0, 0, 2880, 1800)

        ctx.beginPath();
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x, 1800);

        //this.y = 1800 - this.y

        ctx.moveTo(0, 1800 - this.y);
        ctx.lineTo(2880, 1800 - this.y);
        ctx.closePath();
        ctx.lineWidth = 20;
        ctx.strokeSytle = "white"
        ctx.stroke();
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .slider {
        float: right;
        height: 300px;
    }

    .screenShot {
        width: 100%;
        height: 233.75px;
        display: block;
    }
    
    .refreshButton {
        height: 50px;
        width: 50px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
    }

    .rotate360 {
        animation: turn 1s linear infinite;
    }

    @keyframes turn{
        0%{-webkit-transform:rotate(0deg);}
        25%{-webkit-transform:rotate(90deg);}
        50%{-webkit-transform:rotate(180deg);}
        75%{-webkit-transform:rotate(270deg);}
        100%{-webkit-transform:rotate(360deg);}
    }
    
    .xyRow {
        margin-top: 15px;
    }

    .buttonCol {
        float: right;
        text-align: right;
        /* background: #fff; */
    }

    .moveButton {
        width: 75px;
    }

    .xyInput {
        width: 77px;
    }

    .clickButton {
        width: 75px;
    }

    #screenCanvas {
        width: 374px;
        height: 233.75px;
        position: absolute;
        left: 20px;
        z-index: 99;
    }

    .sliderRow {
        margin-top: 0px;
        width: 400px;
    }

    .hidden {
        visibility: hidden;
    }

    .ySlider {
        /* transform:rotate(180deg); */
        margin-top: -20px;
    }

    .xSlider {
        margin-top: 10px;
    }

</style>
