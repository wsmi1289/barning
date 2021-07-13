import JWT from 'jsonwebtoken'

const JwtToken = {

  audience: process.env.EXPECTED_AUD || 'localhost:3000',
	issuer: process.env.EXPECTED_ISS || 'localhost:5000',
  secret: process.env.JWT_SECRET || 'secret',

  decode: function (token) {
  	return JWT.verify(token, this.secret);
  },

	encode: function (user) {
		return JWT.sign(this.payload(user), this.secret);
	},

  expiration: function (expiry_mins) {
  	expiry_mins = expiry_mins || process.env.JWT_EXPIRY_MINS;
  	var now = new Date();
  	return now.setMinutes(now.getMinutes() + expiry_mins);
  },

	payload: function (user) {
		return {
	    iss: this.issuer,
	    exp: this.expiration(5),
	    aud: this.audience,
	    sub: this.subject(user)
	  }
  },

  subject: function (user) { return { id: user.id, email: user.email }; }
}
export { JwtToken }