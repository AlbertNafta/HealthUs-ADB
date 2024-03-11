const db = require("./db.js");

const Accounts = function(accounts) {
  this.username = accounts.username;
  this.password = accounts.treatmentid;
  this.email = accounts.email;
  this.passconfirm = accounts.passconfirm;
  this.role = accounts.role;
};

Accounts.findAll = function(req, res, next) {
    db.query ('SELECT USERNAME, EMAIL, ROLE FROM accounts;', function(err, accountList){
      if(err) {
        return next(err);
      } else {
        res.render('accountList',{accountList: accountList })
        return res.status(400).json(res);
      }

    })

}

Accounts.findOne = function(req, res, next) {
  const username = req.params.username;
  db.query('SELECT USERNAME, EMAIL, ROLE FROM accounts where USERNAME = ?;',[username], function (err, account){
    if(err) {
      return next(err);
    } else {
      res.render('account',{account: account })
      res.status(400).json(res);
    }
  })
}

Accounts.create = function(req, res, next) {
  const {username, password, email, passconfirm } = req.body;
  const role = 'patient';
  // use adb_nhakhoa;
  // DELIMITER //
  // CREATE PROCEDURE CreateAccount(IN p_username CHAR(9), p_password CHAR(45), p_email CHAR(45), p_passconfirm CHAR(45), p_role CHAR(45))
  // BEGIN
  // DECLARE existing_cnt INT;
  // 	-- Check if username has been exist
  // 	SELECT COUNT(*) INTO existing_cnt FROM accounts where USERNAME = p_username;
  //     IF existing_cnt = 0 THEN
  // 		INSERT INTO accounts VALUES (p_username, p_password, p_email, p_passconfirm, p_role);
  //     ELSE 
  // 		SIGNAL SQLSTATE '45000'	
  // 			SET MESSAGE_TEXT = N'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác';
  // 	END IF;
  // END //
  // DELIMITER ;
  let sql = 'CALL sp_insert_account(?,?,?,?,?)'; 
  db.query(sql, [username, password, email, passconfirm, role], function(err) {
    if (err) {
      return res.status(201).json({msg: err.message});
    } else {
      res.render('login');
      console.log({msg: 'Create Success'});
    }
  })
}

Accounts.update = function(req, res, next) {

}

Accounts.delete = function(req, res, next) {
  const username = req.body.username;
  // use 'adb.nha_khoa'
  // DELIMITER //

  // CREATE PROCEDURE DeleteAccountByUsername(IN p_username CHAR(9))
  // BEGIN
  //     DELETE FROM accounts
  //     WHERE USERNAME = p_username;
  // END //
  let sql = 'CALL DeleteAccountByUsername';
  db.query(sql, [username], function(err, account){
    if (err) {
      return res.status(201).json({msg: err.message});
    } else {
      res.render('account', {account: account[0]});
      res.status(201).json({msg: 'Delete success!'});
    }
  })
}

module.exports = Accounts;