angular.module('UAID-Apply', ['vcRecaptcha', 'ngFileUpload'])
  .controller('UAID-ApplyController', ['$http', 'vcRecaptchaService', 'Upload', '$scope', function($http, recaptcha, Upload, $scope){
    var self = this;
    self.log = function() {

      if(self.group1Counter > 2 || self.group4Counter > 2) {
        alert('You have selected too many gifts, please confirm how many gifts you have selected.');
        return;
      }
      self.groupGift();
      //recaptcha
      var response = recaptcha.getResponse();
      $http.post('/apply', {
        'recapResponse': response,
        'fname': self.fname,
        'lname': self.lname,
        'age': self.age,
        'intage': self.intage,
        'ethnicity': self.ethnicity,
        'contactName': self.contactName,
        'contactPhone': self.contactPhone,
        'contactEmail': self.contactEmail,
        'contactRelationship': self.contactRelationship,
        'contactSecPhone': self.contactSecPhone,
        'contactSecRelationship': self.contactSecRelationship,
        'agencyName': self.agencyName,
        'agencyLocation': self.agencyLocation,
        'agencyPhone': self.agencyPhone,
        'photo': self.photo,
        'gifts': self.giftsArr



      }).then(function(response) {
        console.log('You have successfully added a user!' + response);
      }, function(response) {
        console.log('There was an error, please try again later!');
        console.log(response);
      });

    };
    self.gifts = {};
    self.gifts.sizes = [{
      value: 'xs',
      label: 'Extra Small'
    },{
      value: 's',
      label: 'Small'
    },{
      value: 'l',
      label: 'Large'
    },{
      value: 'xl',
      label: 'Extra Large'
    },{
      value: '2xl',
      label: '2x Large'
    },{
      value: '3xl',
      label: '3x Large'
    },{
      value: '4xl',
      label: '4x Large'
    },{
      value: '5xl',
      label: '5x Large'
    },{
      value: '6xl',
      label: '6x Large'
    }];

    self.addPhoto = function() {
      setTimeout(function(){
         self.photo = document.getElementById('photo').value;
        }, 1000)
    };

    self.giftsArr = [];
    self.groupGift = function() {
      var giftItem = {};
      for(var x in self.gifts) {
        for(var y in self.gifts[x])
          if(self.gifts[x][y].name) {
            giftItem = {
              'gift': self.gifts[x][y].name,
            };
            if(self.gifts[x][y].size) {
              giftItem.size = self.gifts[x][y].size;
            }
            self.giftsArr.push(giftItem);
            giftItem = {};
          }
      };
    };

    self.group1Counter = 0;
    self.group4Counter = 0;
    self.giftCheck = function(model, counter, group) {
        if(model){
          counter += 1
        } else {
          counter -= 1
        };
      if(group === 1) {
        self.group1Counter = counter;
      };
      if(group === 4) {
        self.group4Counter = counter;
      }
    }
  }])
