function Dashboard() {
    this.items = [];
    this.fields = {};
    this.rows = [];
    this.editModal;
    this.addModal;
    this.table;
}

Dashboard.prototype.construct = function(el, noAdd) {
    var wrapper = document.getElementById(el);

    this.editModal = this.constructModal();
    this.addModal = this.constructModal();
    
    wrapper.appendChild(this.editModal);
    wrapper.appendChild(this.addModal);

    this.table = document.createElement('table');
    this.table.className = 'dash';

    var tableHeader = this.constructHeader();
    this.table.appendChild(tableHeader);

    var fieldKeys = Object.keys(this.fields);
    var fieldValues = Object.values(this.fields);

    for (var i=0; i < this.items.length; i++) {
        var row = this.constructRow(this.items[i]);
        this.table.appendChild(row);
        this.rows.push(this.items[i]);
    }

    if (!noAdd) {
        button = document.createElement('button');
        button.className = 'dash__button';
        button.textContent = 'Add';
        
        var index = this.items.length;
        self = this;
        button.addEventListener('click', function() {
            var item = {};

            var closeButton = document.createElement('button');
            closeButton.className = 'modal__close';
            closeButton.textContent = 'Close';

            closeButton.addEventListener('click', function() {
                self.addModal.style.display = 'none';

                for (var i=self.addModal.children[0].children.length-1; i > -1; i--) {
                    self.addModal.children[0].removeChild(self.addModal.children[0].children[i]);
                }
            });

            self.addModal.children[0].appendChild(closeButton);

            for (var i=0; i < fieldKeys.length; i++) {
                var input;
                var label;

                if (fieldKeys[i] === '_id')
                    continue;

                if (fieldValues[i].textarea) {
                    input = document.createElement('textarea');
                    input.className = 'modal__textarea';
                } else {
                    input = document.createElement('input');
                    input.className = 'modal__input';
                }

                if (fieldValues[i].readOnly) input.readOnly = true;
                
                input.id = fieldKeys[i] + 'Add';
                
                label = document.createElement('label');
                label.className = 'modal__label';
                label.setAttribute('for', fieldKeys[i] + 'Add');
                label.textContent = fieldValues[i].name;
                input.name = fieldKeys[i];

                self.addModal.children[0].appendChild(label);
                self.addModal.children[0].appendChild(input);
            }

            var updateButton = document.createElement('button');
            updateButton.className = 'modal__button';
            updateButton.textContent = 'Add new';

            (function() {
                updateButton.addEventListener('click', function() {
                    var field;
                    for (var i=0; i < self.addModal.children[0].children.length; i++) {
                        var child = self.addModal.children[0].children[i];
        
                        field = child.getAttribute('name');
        
                        if (field !== null) {
                            item[field] = child.value;
        
                            // if (item[field].length > 25)
                            //     document.getElementById(index + '_' + field).textContent = item[field].substring(0, 25) + '...';
                            // else
                            //     document.getElementById(index + '_' + field).textContent = item[field];
                        }
                    }
                    var req = new XMLHttpRequest();
                    // req.open('POST', 'http://localhost:9000/.netlify/functions/event');
                    req.open('POST', '/.netlify/functions/event');
                    req.setRequestHeader('Content-Type', 'application/json');
                    req.setRequestHeader('x-auth-token', window.localStorage.getItem('token'));
                    req.responseType = 'json';
                    req.onload = function() {
                        var res = req.response;
                        
                        if (res.errors) {
                            console.log(res.errors);
                        } else {
                            // item._id = res._id;
        
                            // self.items.push(item);
                            
                            // row = self.constructRow(item, self.editModal);
        
                            // row = document.createElement('tr');
                            // row.className = 'dash__row';
                            
                            // for (var j=0; j < fieldKeys.length; j++) {
                            //     data = document.createElement('td');
                            //     data.className = 'dash__data';
                            //     data.id = self.items.length + '_' + fieldKeys[j];
                            //     data.textContent = item[fieldKeys[j]];
                            //     row.appendChild(data);
                            // }
        
                            // self.table.appendChild(row);
                        }
                    };
                    req.send(JSON.stringify(item));
                });
            })();

            self.addModal.children[0].appendChild(updateButton);

            self.addModal.style.display = 'block';
        });
        
        
        wrapper.appendChild(button);

        this.table.appendChild(row);
    }

    wrapper.appendChild(this.table);
}

Dashboard.prototype.constructModal = function() {
    var modal = document.createElement('div');
    modal.className = 'modal';
    var modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal__wrapper';
    modal.appendChild(modalWrapper);
    return modal;
}

Dashboard.prototype.constructHeader = function() {
    var tableHeader = document.createElement('tr');
    tableHeader.className = 'dash__header';

    var fieldKeys = Object.keys(this.fields);
    var fieldValues = Object.values(this.fields);

    var tableHead;
    for (var i=0; i < fieldKeys.length; i++) {
        tableHead = document.createElement('th');
        tableHead.className = 'dash__head';
        tableHead.textContent = fieldValues[i].name;
        tableHeader.appendChild(tableHead);
    }

    tableHead = document.createElement('th');
    tableHead.className = 'dash__head';
    tableHeader.appendChild(tableHead);

    tableHead = document.createElement('th');
    tableHead.className = 'dash__head';
    tableHeader.appendChild(tableHead);

    return tableHeader;
}

Dashboard.prototype.constructRow = function(item) {
    var fieldKeys = Object.keys(this.fields);
    var fieldValues = Object.values(this.fields);

    var row;

    row = document.createElement('tr');
    row.className = 'dash__row';
    row.id = this.rows.length + '_row';

    var data;
    var button;
    for (var j=0; j < fieldKeys.length; j++) {
        data = document.createElement('td');
        data.className = 'dash__data';
        data.id = this.rows.length + '_' + fieldKeys[j];

        if (fieldValues[j].textarea) {
            data.textContent = this.items[this.rows.length][fieldKeys[j]];

            if (data.textContent.length > 25) {
                data.textContent = data.textContent.substring(0, 25) + '...';
            }
        } else {
            data.textContent = this.items[this.rows.length][fieldKeys[j]];
        }
        row.appendChild(data);
    }

    data = document.createElement('td');
    data.className = 'dash__data';
    button = document.createElement('button');
    button.className = 'dash__button';
    button.textContent = 'Edit';
    
    var self = this;

    (function() {
        var index = self.rows.length;
        
        button.addEventListener('click', function() {
            var item = {};

            var closeButton = document.createElement('button');
            closeButton.className = 'modal__close';
            closeButton.textContent = 'Close';

            closeButton.addEventListener('click', function() {
                self.editModal.style.display = 'none';

                for (var i=self.editModal.children[0].children.length-1; i > -1; i--) {
                    self.editModal.children[0].removeChild(self.editModal.children[0].children[i]);
                }
            });

            self.editModal.children[0].appendChild(closeButton);

            for (var i=0; i < fieldKeys.length; i++) {
                item[fieldKeys[i]] = self.items[index][fieldKeys[i]];

                var input;
                var label;

                if (fieldValues[i].textarea) {
                    input = document.createElement('textarea');
                    input.className = 'modal__textarea';
                    input.textContent = item[fieldKeys[i]];
                } else {
                    input = document.createElement('input');
                    input.className = 'modal__input';
                    input.value = item[fieldKeys[i]];
                }

                if (fieldValues[i].readOnly) input.readOnly = true;
                
                input.id = fieldKeys[i] + 'Edit';
                
                label = document.createElement('label');
                label.className = 'modal__label';
                label.setAttribute('for', fieldKeys[i] + 'Edit');
                label.textContent = fieldValues[i].name;
                input.name = fieldKeys[i];

                self.editModal.children[0].appendChild(label);
                self.editModal.children[0].appendChild(input);
            }

            var updateButton = document.createElement('button');
            updateButton.className = 'modal__button';
            updateButton.textContent = 'Update';

            updateButton.addEventListener('click', function() {
                var field;
                for (var i=0; i < self.editModal.children[0].children.length; i++) {
                    var child = self.editModal.children[0].children[i];

                    field = child.getAttribute('name');

                    if (field !== null) {
                            item[field] = child.value;
                    }
                }

                console.log(item);
                
                var req = new XMLHttpRequest();
                // req.open('POST', 'http://localhost:9000/.netlify/functions/event');
                req.open('POST', '/.netlify/functions/event');
                req.setRequestHeader('x-auth-token', window.localStorage.getItem('token'));
                req.setRequestHeader('Content-Type', 'application/json');
                req.responseType = 'json';
                req.onload = function() {
                    var res = req.response;
                    
                    console.log(res);

                    if (res.errors) {
                        console.log(res.errors);
                    } else {
                        for (var i=0; i < self.editModal.children[0].children.length; i++) {
                            var child = self.editModal.children[0].children[i];

                    field = child.getAttribute('name');

                    if (field !== null) {
                            item[field] = child.value;

                            if (item[field].length > 25)
                                document.getElementById(index + '_' + field).textContent = item[field].substring(0, 25) + '...';
                            else
                                document.getElementById(index + '_' + field).textContent = item[field];
                            
                            }
                        }
                    }
                }
                req.send(JSON.stringify(item));
            });

            self.editModal.children[0].appendChild(updateButton);

            self.editModal.style.display = 'block';
        });
    })();
    
    data.appendChild(button);
    row.appendChild(data);


    data = document.createElement('td');
    data.className = 'dash__data';
    button = document.createElement('button');
    button.className = 'dash__button';
    button.textContent = 'Delete';

    (function() {
        var index = self.rows.length;
        
        button.addEventListener('click', function() {
            var item = {};
            
            for (var i=0; i < fieldKeys.length; i++) {
                if (fieldValues[i].identifier === true) {
                    item[fieldKeys[i]] = self.items[index][fieldKeys[i]];
                    break;
                }
            }

            var req = new XMLHttpRequest();
            // req.open('DELETE', 'http://localhost:9000/.netlify/functions/event');
            req.open('DELETE', '/.netlify/functions/event');
            req.setRequestHeader('Content-Type', 'application/json');
            req.setRequestHeader('x-auth-token', localStorage.getItem('token'));
            req.responseType = 'json';
            req.onload = function() {
                var res = req.response;
                
                if (res.errors) {
                    console.log(res.errors);
                } else {
                    console.log(self.table.removeChild(self.table.children[index+1]));
                    index--;
                }
            }

            req.send(JSON.stringify(item));
        });
    })();
    
    data.appendChild(button);
    row.appendChild(data);

    return row;
}
