<!-- table表格组件 -->
<template>
  <el-card
    v-loading.lock="loading"
    element-loading-text="拼命加载中"
    class="table-common"
    shadow="never"
    rer="cardTable"
  >
    <!-- 操作搜索栏 -->
    <!-- <el-form
      inline
      :model="curd.formModel"
      v-if="showTableActionBar"
      ref="ruleForm"
    >
      <slot name="toolbar"></slot>
      <el-form-item>
        <template slot="label">
          <el-button
            type="text"
            v-if="!useWrapSearch"
            size="small"
            @click="
              pageNumber = 0;
              query();
            "
            >查询</el-button
          >

          <el-button type="text" @click="add" v-if="showAdd" size="small">{{
            addText
          }}</el-button>
          <el-button type="text" @click="delAll" v-if="showDelAll" size="small"
            >批量删除</el-button
          >
        </template>
      </el-form-item>
    </el-form> -->
    <!-- 表格按钮 -->
    <!-- <el-row class="toolbar" v-if="showTableActionBtn">
      <el-col :span="10" class="curd-item-btn">
        <el-button v-if="showDelAll" @click="delAll" size="small">
          {{ delText }}
        </el-button>
        <slot name="toolRight"></slot>
      </el-col>
    </el-row> -->
    <!-- 表格 -->
    <el-table
      :data="rows"
      class="curd-custom__table"
      :show-header="showHeader"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      @sort-change="sortChange"
      tooltip-effect="dark"
      :height="curHeight"
    >
      <!-- 复选框 -->
      <!-- <el-table-column
        v-if="selectioBox"
        type="selection"
        :selectable="selectable"
      /> -->
      <!-- 序号 -->
      <!-- <el-table-column
        v-if="showIndex"
        width="60"
        :resizable="false"
        label="序号"
      >
        <template slot-scope="scope">
          <span>{{ (pageNumber + 1 - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <slot></slot> -->
      <!-- 可增加的操作内容 -->
      <el-table-column
        v-if="useParamsAcation && showActions"
        label="操作"
        :width="actionWidth"
        @class-name="col - action"
        :resizable="false"
      >
        <template v-slot="scope">
          <!-- 编辑 -->
          <!-- <svg-icon
            icon-class="bianjiNotcie"
            v-if="showEdit(scope.row)"
            :contentText="editText"
            @click="edit(scope.row, scope.$index)"
          /> -->
          <!-- 发布 -->
          <!-- <svg-icon
            icon-class="bianjiNotcie"
            v-if="showPublish(scope.row)"
            :contentText="publishText"
            @click="publish(scope.row, scope.$index)"
          /> -->
          <!-- 删除 -->
          <!-- <svg-icon
            icon-class="bianjiNotcie"
            v-if="showDel(scope.row)"
            :contentText="delText"
            @click="del(scope.row, scope.$index)"
          /> -->
          <!-- 随机 -->
          <!-- <svg-icon
            :icon-class="act.iconClass"
            v-if="displayAction(act, scope.row, scope.$index)"
            v-for="(act, a) in actions"
            :key="a"
            :contentText="actionContentText(act)"
            @click="act.click(scope.row, act, scope.$index)"
          /> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <el-pagination
      v-if="paginationShow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber + 1"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecord"
      class="paging-style"
      background
    />
  </el-card>
</template>

<script>
import BScroll from "better-scroll";
import { utilConvert } from "wheelutils";
export default {
  name: "curdTable",
  props: {
    // 是否展示表格操作栏
    showTableActionBar: {
      type: Boolean,
      default: true,
    },
    // 是否显示表格操作按钮
    showTableActionBtn: {
      type: Boolean,
      default: false,
    },
    // 是否显示分页
    paginationShow: {
      type: Boolean,
      default: true,
    },
    // 是否使用自定义的查询按钮搜索列表
    useWrapSearch: {
      type: Boolean,
      default: false,
    },
    // 是否使用传人参数控制操作栏
    useParamsAcation: {
      type: Boolean,
      default: true,
    },
    // 源数据
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    idField: {
      type: String,
      required: true,
      validator: function (val) {
        return !utilConvert.isNullOrEmpty(val);
      },
    },
    sortField: {
      type: String,
      default: "DESC",
    },
    sortName: {
      type: String,
      default: "",
    },
    // 复选框
    selectioBox: {
      type: Boolean,
      default: false,
    },
    // 序号显示
    showIndex: {
      type: Boolean,
      default: false,
    },
    // 是否显示表格表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // height: [String, Number],
    setHeight: {
      type: String,
      default: "",
    },
    // 查询及各种参数
    curd: {
      type: Object,
      required: true,
      default: function () {
        return {};
      },
    },
    // 操作栏
    actions: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 操作栏宽度
    actionWidth: {
      type: Number,
      default: 200,
    },
    // 表格curPageIndex
    curPageIndex: {
      type: String,
      default: "pageIndex",
    },
  },
  data() {
    return {
      BS: null,
      loading: false,
      rows: this.data,
      windowSize: {
        height: window.innerHeight,
      },
      beforePageSize: 10,
      checkedRows: [],
      totalRecord: 0, // 默认总条目数
      pageSize: 10, // 默认当前页
      pageNumber: 0,
    };
  },
  watch: {
    data(val) {
      this.rows = val;
    },
  },
  created() {
    var _this = this;
    window.onresize = function () {
      _this.windowSize = {
        height: window.innerHeight,
      };
    };
  },
  mounted() {
    this.scrollInit();
  },
  beforeUnmount() {
    this.scrollDestroy();
  },
  computed: {
    // 高度
    curHeight() {
      console.log(this.windowSize.height, "当前屏幕大小");
      let setWindowSize = 0;
      if (this.paginationShow) {
        if (this.windowSize.height <= 657) {
          // 屏幕分辨率1366*768
          setWindowSize = `${(515 / 1920) * 100}vw`;
        } else {
          setWindowSize = `${(620 / 1920) * 100}vw`;
        }
      } else {
        if (this.windowSize.height <= 657) {
          // 屏幕分辨率1366*768
          setWindowSize = `${(615 / 1920) * 100}vw`;
        } else {
          setWindowSize = `${(720 / 1920) * 100}vw`;
        }
      }
      let cur = this.setHeight || setWindowSize;
      return cur.toString();
    },
    // 添加
    addText() {
      var o = this.curd.add;
      if (o) {
        return o.name || "添加";
      }
      return "";
    },
    // 编辑
    editText() {
      var o = this.curd.edit;
      if (o) {
        return o.name || "编辑";
      }
      return "";
    },
    // 删除
    delText() {
      var o = this.curd.del;
      if (o) {
        return o.name || "删除";
      }
      return "";
    },
    // 新增
    showAdd() {
      var o = this.curd.add;
      return o && o.view && this.permissionButton(o.code);
    },
    // 批量删除
    showDelAll() {
      var o = this.curd.del;
      return o && o.api && o.delAll === true && this.permissionButton(o.code);
    },
    // 可增加的操作内容
    showActions() {
      if (!this.rows || this.rows.length == 0) return false;
      var show = this.showEdit || this.showDel;
      if (show || this.actions) {
        for (var i = 0; i < this.actions.length; i++) {
          var a = this.actions[i];
          if (
            a &&
            typeof a.click === "function" &&
            a.display &&
            this.permissionButton(a.code)
          ) {
            return true;
          }
        }
      }
      return show;
    },
  },
  methods: {
    scrollInit() {
      this.BS = new BScroll(this.$refs.cardTable, {
        mouseWheel: true,
        click: true,
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      });
    },
    scrollDestroy() {
      try {
        this.BS.destroy();
      } catch (e) {
        delete this.BS;
        this.BS = null;
      }
    },
    // 是否显示勾选框
    selectable(row) {
      var o = this.curd;
      if (this.selectable && o && typeof o.selectableParams == "function") {
        return o.selectableParams.call(this, row);
      }
      return true;
    },
    // 显示编辑
    showEdit(row) {
      var o = this.curd.edit;
      let display = false;
      if (
        o &&
        typeof o.display == "function" &&
        this.permissionButton(o.code)
      ) {
        display = o.display.call(this, row);
      }
      return display;
    },
    // 显示删除
    showDel(row) {
      var o = this.curd.del;
      let display = false;
      if (
        o &&
        typeof o.display == "function" &&
        o.api &&
        this.permissionButton(o.code)
      ) {
        display = o.display.call(this, row);
      }
      return display;
    },
    // 显示随机按钮
    displayAction(act, row, index) {
      let display = false;
      if (
        act &&
        typeof act.display == "function" &&
        this.permissionButton(act.code)
      ) {
        display = act.display.call(this, row, index, this.rows);
      }
      return display;
    },
    // 随机按钮名称
    actionContentText(act) {
      return act.name;
    },
    // 勾选框
    handleSelectionChange(val) {
      console.log(val);
      this.checkedRows = val;
      this.$emit("selection-change", this.checkedRows);
    },
    // 翻页设置页码
    handleSizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    // 当前页 上下页
    handleCurrentChange(val) {
      this.pageNumber = val - 1;
      this.query();
    },
    // 新增
    add() {
      if (this.showAdd) {
        let o = this.curd.add;
        let options = {};
        options.props = Object.assign({}, o.props);
        options.style = Object.assign({}, o.style);
        options.props["mode"] = "add";
        let vnode = this.$createElement(o.view, options);
        this.$dialog(vnode, this.addText, (data) => {
          if (util.isFunction(o.callback)) {
            o.callback(data);
          }
          this.query();
        });
      }
    },
    // 编辑
    edit(row) {
      if (this.showEdit) {
        this.$store.commit("system/notice/setPreviewInfo", row);
        this.$router.push(`/contentDetails/noticeRelease/edit`);
      }
    },
    // 删除
    del(row) {
      if (this.showDel) {
        var o = this.curd.del;
        this.$confirm(`是否删除选中的${o.tips}，删除后将不能恢复！`, "提示", {
          closeOnClickModal: false,
        })
          .then(() => {
            var key = this.idField;
            var ds = {};
            ds[key] = row[this.idField];
            o.api({ data: { ...ds } }).then((res) => {
              if (utilConvert.isFunction(o.callback)) {
                o.callback(ds[key]);
              }
              if (!res.code) {
                this.$message.success("删除成功");
                this.query();
              }
            });
          })
          .catch(() => {});
      }
    },
    // 批量删除
    delAll() {
      if (this.showDelAll) {
        var o = this.curd.del;
        if (this.checkedRows.length <= 0) {
          this.$message({
            showClose: true,
            message: `请勾选需要删除的${o.tips}！`,
            type: "error",
            closeOnClickModal: false,
          });
        } else {
          this.$confirm(`是否删除选中的${o.tips}，删除后将不能恢复！`, "提示", {
            closeOnClickModal: false,
          })
            .then(() => {
              var key = this.idField;
              var ds = {};
              ds[key] = [];
              this.checkedRows.forEach((a) => {
                ds[key].push(a[this.idField]);
              });
              o.api({ data: { ...ds } }).then((res) => {
                if (typeof o.callback === "function") {
                  o.callback(ds[key]);
                }
                if (!res.code) {
                  this.$message.success("删除成功");
                  this.query();
                }
              });
            })
            .catch(() => {});
        }
      }
    },
    // 排序
    sortChange(column) {
      //打印看看参数有哪些？
      console.log("排序", column.prop, column.order);
      //排序默认是从第一页开始
      this.pageSize = 1;
      this.listQuery = {};
      //排序的字段是属性名
      this.listQuery.sort = column.prop;
      //排序的方式是根据上下选择来确定
      this.listQuery.asc = column.order == "ascending" ? true : false;
      console.log(this.listQuery);
      //此方法为获取数据的方法
    },
    query() {
      let _this = this;
      if (typeof this.curd.query.before === "function") {
        var r = this.curd.query.before(data);
        if (r === true) return;
      }
      let requestData = {};
      if (this.paginationShow) {
        // 分页
        requestData = {
          data: {
            ...this.curd.formModel,
          },
          pageSize: this.pageSize,
          [this.curPageIndex]: this.pageNumber,
          sort: this.sortField,
          sortName: this.sortName,
        };
      } else {
        requestData = {
          // 不分页
          data: {
            ...this.curd.formModel,
          },
        };
      }
      console.log("搜索查询参数===>", requestData);
      this.loading = true;
      _this.curd.query.api(requestData).then(
        (res) => {
          const { data, code } = res;
          if (!code) {
            if (this.paginationShow) {
              _this.totalRecord = data.page.total;
              _this.rows = data.tables || [];
              _this.loading = false;
            } else {
              _this.rows = data.tables || [];
              _this.loading = false;
            }
            console.log(
              data,
              _this.rows,
              _this.totalRecord,
              "父组件的搜索内容"
            );
          }
        },
        () => {
          this.loading = false;
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.pageNumber = 0;
      this.query();
    },
  },
};
</script>

<style lang="scss">
@import "./reset-table.scss";

.curd-item-btn span .el-input__inner {
  border-radius: 6px;
}
</style>
