const { createApp } = Vue;

createApp({
    data() {
        return {
            display: '0',
            operands: [],
            operator: '',
            editMode: false
        }
    },
    methods: {
        eval () {
            let ops = this.operands
            
            if (ops.length == 0) {
                return 0
            }
            if (ops.length == 1) {
                return ops[0]
            }
            switch (this.operator) {
                case '': return ops[0]
                case '+': {                    
                    return parseFloat(ops[1]) + parseFloat(ops[0])
                }
                case '-': {
                    return parseFloat(ops[1]) - parseFloat(ops[0])
                }
                case '*': {
                    return parseFloat(ops[1]) * parseFloat(ops[0])
                }
                case '/': {
                    return parseFloat(ops[1]) / parseFloat(ops[0])
                }
                default: return ops[0]
            }
        },
        rehydrate (val) {
            this.operands.splice(0,0,val)
            if (this.operands.length > 2) {
                this.operands.pop();
            }
        },
        operate (e) {
            if (this.editMode == true) {
                this.rehydrate(parseFloat(this.display))
            }
            let result = this.eval()
            this.rehydrate(result)
            this.operator = e.target.innerHTML.toString()
            this.display = '0'
            this.editMode = false
        },
        clear () {
            this.display = '0'
            this.operands = []
            this.operator = ''
            this.editMode = false
        },
        equals () {
            let result = this.eval()
            this.display = result.toString()
            this.rehydrate(result)
            this.operator = ''
            this.editMode = false
        },
        decimal () {
            if (this.display.includes('.')) {
                return
            }
            if (!this.editMode) {
                this.display = '0.0'
                this.editMode = true 
            }
        },
        zero () {
            if(this.editMode) {
                this.display += '0'
            }
            this.rehydrate(parseFloat(this.display))
        },
        digit (e) {
            if (!this.editMode) {
                this.display = e.target.innerHTML.toString()
                this.editMode = true
            } else if(this.display == '0.0'){
                this.display = '0.' + e.target.innerHTML.toString()
            } else {
                this.display += e.target.innerHTML.toString()
            }
            this.rehydrate(parseFloat(this.display))
        }
    }
}).mount('#app');
