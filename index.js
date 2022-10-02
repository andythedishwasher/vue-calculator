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
        eval (ops) {
            if (ops.length == 0) {
                return 0
            }
            if (ops.length == 1) {
                return ops[0]
            }
            switch (this.operator) {
                case '': return ops[0]
                case '+': {
                    let result = parseFloat(ops[1]) + parseFloat(ops[0])
                    return result
                }
                case '-': {
                    let result = parseFloat(ops[1]) - parseFloat(ops[0])
                    return result
                }
                case '*': {
                    let result = parseFloat(ops[1]) * parseFloat(ops[0])
                    return result
                }
                case '/': {
                    let result = parseFloat(ops[1]) / parseFloat(ops[0])
                    return result
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
            let result = this.eval(this.operands)
            console.log(result)
            this.rehydrate(result)
            this.operator = e.target.innerHTML.toString()
            this.display = '0'
            this.editMode = false
            console.log(this.operands)
            console.log(parseFloat(2) * parseFloat(0.9))
        },
        clear (e) {
            this.display = '0'
            this.operands = []
            this.operator = ''
            this.editMode = false
            console.log(this.operands)
        },
        equals (e) {
            console.log(this.operator)
            let result = this.eval(this.operands)
            this.display = result.toString()
            this.rehydrate(result)
            this.operator = ''
            this.editMode = false
            console.log(this.operands)
        },
        decimal (e) {
            if (this.display.includes('.')) {
                return
            }
            if (!this.editMode) {
                this.display = '0.0'
                this.editMode = true 
            }
            console.log(this.operands)
        },
        zero (e) {
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
            console.log(this.operands)
        }
    }
}).mount('#app');