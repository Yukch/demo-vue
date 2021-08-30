<template>
    <div class="tasklist">
        <el-row>
            <draggable v-model="myArray" group="people" 
                @start="drag=true" @end="drag=false" 
                chosenClass="chosen"
                ghostClass="ghost"
                animation="500"
                handle=".iconLeft"
                :scroll="false">
                
                <el-col v-for="todo in todos" :key="todo.text">
                    <el-card body-style = "height: 45px; line-height: 45px; padding: 0px 20px"
                            @click.native = "todo.checked = !todo.checked"
                            shadow="never">
                        <i class="" :class="[todo.icon, 'iconLeft']"></i>                            
                        {{ todo.text }}
                        <el-checkbox v-model="todo.checked" class="checkRight"></el-checkbox>
                    </el-card>
                </el-col>
            </draggable>
        </el-row>
        
        <!-- <div>
            <el-button round plain>Click</el-button>
            <el-button round plain>Click</el-button>
        </div> -->
        <el-button icon="el-icon-plus" circle class="addButton"></el-button>            

    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Task',
  components: {draggable,},
  data () {
    return {
        todos: [
            {icon: "el-icon-notebook-1", text: "Card 1", checked: true},
            {icon: "el-icon-collection", text: "Card 2", checked: false},
            {icon: "el-icon-edit", text: "Card 3", checked: false},
            {icon: "el-icon-data-analysis", text: "Card 4", checked: false},
            {icon: "el-icon-mouse", text: "Card 5", checked: false}
        ],
        myArray: []
    }
  }
}
</script>

<style>
    /* .tasklist {
        position: fixed;
    } */

    .el-col {
        margin-bottom: 10px;
        /* text-align: left; */
    }

    .iconLeft {
        float: left;
        height: 45px;
        line-height: 45px;
        font-size: 20px;
        padding-left: 20px;
        margin-left: -20px;
    }

    .checkRight {
        float: right;
    }

    .addButton {
        height: 50px;
        width: 50px;
        position: fixed;
        bottom: 20px;
        right: 20px;
    }

    .ghost > div:first-child{
        border: 1px dashed #ccc;
        opacity: 0;
    }

</style>