<template>
  <div class="user_admin_dialog">
    <el-form :model="form">
      <el-form-item label="名字" :label-width="formLabelWidth" size="60px">
        <el-input size="small" v-model=" form.name "></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
        <el-input type="text" size="small" v-model.number="form.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" style="text-align: center">
        <el-cascader :options="sexList" size="small" v-model="form.sex"></el-cascader>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input type="text" size="small" v-model.number="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" class="box">
        <el-cascader :options="options" clearable size="small" v-model="form.address2.city"></el-cascader>
        <el-input type="text" size="small" v-model="form.address2.street" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow">取 消</el-button>
      <el-button type="primary" @click="add()">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form2: {
      type: Object
    }
  },
  watch: {
    form2: {
      inheritAttrs: true,
      handler: function (event) {
        this.form = event
      }
    }
  },
  name: 'UserAdminDialog',
  data() {
    return {
      form: {
        address2: {
          city: '',
          street: ''
        }
      },
      formLabelWidth: '120px',
      options: [
        {
          label: '广东省',
          value: '广东省',
          children: [
            {
              label: '广州市',
              value: '广州市',
              children: [
                { label: '白云区', value: '白云区' },
                { label: '番禺区', value: '番禺区' },
                { label: '天河区', value: '天河区' }
              ]
            },
            {
              label: '佛山市',
              value: '佛山市'
            }
          ]
        }
      ],
      sexList: [
        {
          label: '男',
          value: '男'
        },
        { label: '女', value: '女' }
      ],
      is: false
    }
  },
  created() {
    this.form = this.form2
  },
  methods: {
    isShow() {
      this.$emit('show')
    },
    add() {
      let form = this.form
      Object.assign(form, { id: new Date().valueOf() })
      form.address = form.address2.city.join('') + form.address2.street
      form.sex = form.sex[0]
      // console.log(form)
      this.$nextTick(() => {
        this.$emit('add', form)
      })
    }
  }
}
</script>