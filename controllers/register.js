
const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }

    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {     // create transaction (when doing more than one thing)
        // 'trx' object is used instead of 'db'

        trx.insert({    // insert pw hash and email to 'login' table
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email') // returns the email inserted to be used for 'user' table
        .then(loginEmail => { // email becomes 'loginEmail'
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit) // must commit changes when using a transaction
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    handleRegister: handleRegister
}