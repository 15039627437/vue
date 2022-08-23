<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container>
    <el-header>
      <h4>用户管理</h4>
    </el-header>
    <el-main style="height:100%">
      <div class="main-head">
        <div class="main-content">
          <el-button type="primary" @click="show()" style="margin-right:20px">新建</el-button>
          <el-input placeholder="请输入关键字" v-model="val" clearable></el-input>
        </div>
        <el-button type="success">撤销</el-button>
      </div>
      <!-- 新建 -->
      <el-dialog title="新建/编辑" :visible="dialogFormVisible" class="formInput" @close="dialogFormVisible=false">
        <user-admin-dialog @show="show" @add="add" :form2="form" :number="'你'"></user-admin-dialog>
      </el-dialog>
      <!-- 表单组件 -->
      <user-admin-table ref="table" :tableLabel="tableLabel" :tableData="tableData" @tabDelete="tabDelete" @tabUpdate="tabUpdate"></user-admin-table>
      <div style="display: flex;padding-left: 40px;padding-top: 40px;">
        <el-button type="danger" @click="deleteLsit()">删除</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import UserAdminDialog from '@/views/userAdmin/components/UserAdminDialog.vue'
import UserAdminTable from '@/views/userAdmin/components/UserAdminTable.vue'
export default {
  components: { UserAdminDialog, UserAdminTable },
  data() {
    return {
      val: '',
      form2: {
        name: '',
        age: '',
        sex: '',
        phone: '',
        address: '',
        address2: {
          city: '',
          street: ''
        }
      },
      form: {
        name: '',
        age: '',
        sex: '',
        phone: '',
        address: '',
        address2: {
          city: '',
          street: ''
        }
      },
      dialogFormVisible: false,
      tableLabel: [
        // 表格字段
        { prop: 'name', label: '名字', width: 100 },
        { prop: 'age', label: '年龄', width: 100 },
        { prop: 'sex', label: '性别', width: 80 },
        { prop: 'phone', label: '联系电话', width: 100 },
        { prop: 'address', label: '地址', width: 100 }
      ],
      operateForm: {
        name: '',
        age: '',
        sex: '',
        phone: '',
        address: ''
      },
      tableData: null
    }
  },
  created() {
    let cache = localStorage.getItem('tableData')
    if (cache) {
      this.tableData = JSON.parse(cache)
      this.tableData2 = JSON.parse(cache)
    } else {
      this.tableData = [
        {
          id: '1',
          name: '王小红',
          age: '1238525',
          sex: '女',
          phone: '1238525125',
          address: '广东省广州市白云区erw',
          address2: {
            city: ['广东省', '广州市', '白云区'],
            street: 'erw'
          }
        },
        {
          id: '2',
          name: '王小虎',
          age: '20',
          sex: '男',
          phone: '1238525',
          address: '广东省广州市白云区er',
          address2: {
            city: ['广东省', '广州市', '白云区'],
            street: 'er'
          }
        }
      ]
      this.tableData2 = this.tableData
    }
  },
  methods: {
    tabDelete(index) {
      console.log(index)
      this.tableData = this.tableData.filter((e, i) => i !== index)
      localStorage.setItem('tableData', JSON.stringify(this.tableData))
      this.$message.error({
        message: '删除成功',
        duration: 1000
      })
    },
    tabUpdate(row) {
      row.sex = row.sex == '男' ? ['男'] : ['女']
      this.form = row
      this.dialogFormVisible = true
    },
    add(item) {
      let listId = this.tableData.map(e => {
        return e.id
      })
      //   console.log('222222222222222', listId.indexOf(item.id), listId)

      if (listId.indexOf(item.id) > -1) {
        this.tableData[listId.indexOf(item.id)] = item
        this.$message.success({
          message: '修改成功',
          duration: 1000
        })
      } else {
        this.tableData.push(item)
        this.$message.success({
          message: '添加成功',
          duration: 1000
        })
      }
      this.show()
      localStorage.setItem('tableData', JSON.stringify(this.tableData))
    },
    show() {
      this.form = this.form2
      this.dialogFormVisible = !this.dialogFormVisible
    },
    deleteLsit() {
      let list = this.$refs.table.list
      if (!list.length) {
        this.$message.error({
          message: '请选择要删除的用户信息',
          duration: 1000
        })
        return
      }
      this.tableData = this.tableData.filter(e => {
        return list.includes(e.id) ? '' : e
      })
      localStorage.setItem('tableData', JSON.stringify(this.tableData))
      this.$refs.table.list = []
      this.$message.error({
        message: '删除成功',
        duration: 1000
      })
    }
  },
  watch: {
    val(newVal) {
      if (!newVal) {
        this.tableData = this.tableData2
        return
      }
      let re = new RegExp(newVal, 'g')
      let list = []
      this.tableData.map(e => {
        if (re.test(e.name)) {
          list.push(e)
        }
      })
      this.tableData = list
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #ececec;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.formInput {
  .el-form-item {
    width: 50%;
    display: inline-block;
  }
  .box {
    display: flex;
    width: 100%;
  }
}
::v-deep .el-form-item__content {
  display: flex;
  margin: 0 !important;
  align-items: center;
  .el-cascader {
    margin-right: 20px;
  }
}
.main-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 40px 40px;
  box-sizing: border-box;
  .main-content {
    display: flex;
    width: 400px;
  }
}
</style>