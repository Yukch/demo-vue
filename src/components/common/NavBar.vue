<template>
    <div>
        <div class="el-icon-s-unfold contentIcon" @click="drawer.isOpen = true"></div>
        
        <!-- 左侧隐藏菜单 -->
        <el-drawer
        custom-class="drawer"
        :with-header="false"
        :visible.sync="drawer.isOpen"
        :direction="drawer.direction"
        :size="drawer.size"
        :show-close="drawer.showClose"
        >
        <p class="drawerTitle">System</p> 
        <el-divider class="minDiv"></el-divider>
        <p>mayuchao</p>
        <el-divider class="minDiv"></el-divider>
        
        <el-menu
            text-color="rgb(172, 174, 177)"
            active-text-color= "rgb(172, 174, 177)"
            :default-active="this.$route.path"
            router
			class="menuContent">
            <el-menu-item v-for="(item, i) in drawer.content" :key="i" :index="item.path" @click="drawer.isOpen = false">
                <div class="contentItem">
                    <i :class="item.icon" class="contentItemIcon"></i>
                    {{ item.name }}
                </div>
            </el-menu-item>
        </el-menu>
		

        <el-menu
            text-color="rgb(172, 174, 177)"
            active-text-color= "rgb(172, 174, 177)">
            <el-menu-item @click="drawer.isOpen = false">
			<div class="closeItem" @click="logout">
				<i class="el-icon-circle-close" id="closeIcon"></i>
				注销
			</div>					

            </el-menu-item>
        </el-menu>



        </el-drawer>     
    </div>

</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      drawer: {
        isOpen: false,
        direction: "ltr",
        size: "50%",
        showClose: false,
        content: [
			{name: '管理面板', path:'/', icon:'el-icon-menu'},
			{name: '笔记提醒', path:'/task', icon:'el-icon-notebook-2'},
			{name: '屏幕截图', path:'/screen', icon:'el-icon-monitor'},
			// {name: '暂存文字', path:'/note', icon:'el-icon-edit-outline'},
			// {name: '查看桌面', path:'/screenshot', icon:'el-icon-monitor'},
			// {name: 'RPN计算', path: '/calculate', icon:'iconfont icon-jisuanqi'}
        ]
      },
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
	  logout() {
			var _this = this

			this.$axios.post('/api/logout').then((response) => {
				console.log(response.data)
				_this.$router.push({name:'Login'});
				this.$notify({
					// title: 'ERROR',
					// message: 'ERROR',
					type: 'success',
					position: 'top-left',
					offset: 100,
					customClass: "logoutNotify",
					showClose: false,
					duration: 1500
				});
			})
	  }
  }
}
</script>

<style>
	.header {
		text-align: center;
        background-color: #fff;
        padding: 0px;
	}

	.menuContent {
		height: 400px;
	}

    .contentIcon{
        /* color: black; */
        color: #999;
        line-height: 45px;
        font-size: 25px;
        float: left;
        margin-left: 10px;
        /* position: absolute; */
    }

	/* 左侧菜单样式 */
	.drawer{
		background-color: rgb(52, 58, 64);
		color: rgb(172, 174, 177);
	}

	.contentItemIcon{
		margin-right: 0px;
		font-size: 18px;
		height: 20px;
		/* line-height: 50px; */
	}

	.el-menu {
		border-right: 0px;
		background-color: rgb(52, 58, 64);
		margin-top: 10px;
	}
	.el-menu-item {
		height: 40px;
		line-height: 40px;
	}
	.el-menu-item:focus{
		background-color: rgb(52, 58, 64);
	}
	.el-menu-item:hover{
		background-color: rgb(52, 58, 64);
	}
	.el-menu-item:focus .contentItem {
		background-color: #aaa;
		color: black;
		border-radius: 5px;
	}
	.is-active .contentItem{
		background-color: #aaa;
		color: black;
		border-radius: 5px;
	}
	.drawerTitle{
		padding: 3px 0px;
	}

	.minDiv{
		height: 1px;
		margin: 0px;
		background-color: rgb(79,89,98);
	}

	.footer {
		/* background-color: black;
		color: rgb(172, 174, 177); */
		position: absolute;
		width: 100%;
		bottom: 0px;
		line-height: 45px;
	}

	.closeItem {
		display: flex;
		justify-content: center;
	}

	#closeIcon {
		font-size: 18px;
		line-height: 40px;
		margin-right: 2px;
        /* position: absolute; */
	}

	.logoutNotify {
        width: 50px;
	}
</style>