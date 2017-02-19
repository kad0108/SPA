<template>
	<div>
		<input type="text" id="account" placeholder="请输入账号" v-model="account">
		<input type="password" v-model="password" id="password" placeholder="请输入密码">
		<button type="button" @click="login">登录</button>
	</div>
</template>

<script>
export default{
	data () {
		return {
			account: '',
			password: ''
		}
	},
	methods: {
		login () {
			this.$http.get('/api/login/getAccount').then(response => {
				// this.xx = response.body;
				console.log(response);
				let user = {
					account: this.account,
					password: this.password
				};
				return this.$http.post('/api/login/createAccount', user);
			}, response => {
				//error
			})
		}
	}
}

</script>

<style>
	
</style>