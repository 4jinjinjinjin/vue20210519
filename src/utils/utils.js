export default {
    showSuccessTip: function (view,value) {
        view.$message({
            message: value,
            type: 'success'
        });
    },
    showErrorTip: function (view,value) {
        view.$message.error(value);
    },
    showWarningTip: function (view,value) {
        view.$message({
            message: value,
            type: 'warning'
        });
    },


}
