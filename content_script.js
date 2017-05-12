(function () {
    var open = window.XMLHttpRequest.prototype.open,
        send = window.XMLHttpRequest.prototype.send;

    function customOpen(method, url, async) {
        var syncMode = async !== false ? 'async' : 'sync';
        console.log(
            'Preparing ' +
            syncMode +
            ' HTTP request : ' +
            method +
            ' ' +
            url
        );
        return open.apply(this, arguments);
    }

    function customSend(data) {
        console.log(data);
        //todo: handle the data
        if(this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange;
        }
        this.onreadystatechange = onCustomReadyStateChange;

        return send.apply(this, arguments);
    }

    function onCustomReadyStateChange() {
        console.log('HTTP request ready state changed : ' + this.readyState);
        if(this._onreadystatechange) {
            return this._onreadystatechange.apply(this, arguments);
        }
    }

    window.XMLHttpRequest.prototype.open = customOpen;
    window.XMLHttpRequest.prototype.send = customSend;

	
	var savePhoneNumber = function (num) {
        var data = {
            number : num,
            time: new Date(),
            url: window.location.origin
        };
        localStorage.setItem(data.number + data.url, JSON.stringify(data));
    };

	$('body').on('submit', 'form', function () {
		console.log(this);
		alert('yes');

    });

	function pickPhoneNum($input) {
		if(!$input || $input.length <= 0) return;
        var reg = /^1[3|4|5|7|8][0-9]{9}$/, num = $input.val();
        if(reg.test(num)) {
        	//todo
            savePhoneNumber(num);
		}
    }
})();