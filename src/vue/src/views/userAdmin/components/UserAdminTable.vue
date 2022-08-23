<template>
  <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column :prop="item.prop" :label="item.label " v-for="(item) of tableLabel" :key="item.prop"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  name: 'UserAdminTable',
  props: {
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    handleDelete(index) {
      this.$emit('tabDelete', index)
    },
    handleEdit(row) {
      this.$emit('tabUpdate', row)
    },
    handleSelectionChange(val) {
      let list = []
      if (val) {
        val.map(e => {
          list.push(e.id)
        })
      }
      this.list = list
    }
  }
}
</script>

<style lang="scss" scoped>
</style>