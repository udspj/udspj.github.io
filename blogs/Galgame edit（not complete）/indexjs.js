new Vue({
    el: '#container',

    data: {
        message: 'hellowwolll',
        nowPage: 0,
        inputPage: 0,
        page: {
            textname: '',
            textdialog: '',
            bkimage: '',
            chara1img: '',
            chara1exp: ''
        },
        pages: [{
            textname: '',
            textdialog: '',
            bkimage: '',
            chara1img: '',
            chara1exp: ''
        }]
    },

    methods: {
        addPage: function() {
            this.nowPage += 1;
            this.pages.splice(this.nowPage, 0, {
                textname: '',
                textdialog: '',
                bkimage: '',
                chara1exp: ''
            });
            this.page = this.pages[this.nowPage];
        },
        savePage: function() {
            this.pages.splice(this.nowPage, 1, this.page);
        },
        delPage: function(page) {
            this.pages.splice(this.pages.indexOf(page), 1);
        },
        prevPage: function() {
            if (this.nowPage > 0) {
                this.nowPage -= 1;
            }
            this.page = this.pages[this.nowPage];
        },
        nextPage: function() {
            if (this.nowPage < this.pages.length - 1) {
                this.nowPage += 1;
            }
            this.page = this.pages[this.nowPage];
        },
        pagetextchange: function(inputPage) {
            this.inputPage = inputPage.replace(/\D/g, '')
            if (this.inputPage > 0 && this.inputPage <= this.pages.length) {
                this.nowPage = this.inputPage - 1;
                this.page = this.pages[this.nowPage];
            }
        },

        onBKChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var image = new Image();
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.page.bkimage = e.target.result;
            };
        },
        onChara1Change: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var image = new Image();
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.page.chara1img = e.target.result;
            };
        },
        onChara1expChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var image = new Image();
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.page.chara1exp = e.target.result;
            };
        }
    },

    computed: {
        pageCount: function() {
            return this.pages.length;
        }
    }
})
