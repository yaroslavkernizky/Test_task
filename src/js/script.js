$(document).ready(function () {

    var branchesId = 0;
    var leavesId = 0;

    //Инициируем начальными значениями селекторы для выбора веток.
    fillSelectBranches();

    //Инициируем начальными значениями селекторы для выбора элементов.
    fillSelectLeaves();

    // функция для создания ветки
    function createBranch(id) {
        return '<li><ul id="' + id + '"><li><label>Branch: id = ' + id + '</label></li></ul></li>'
    }

    //Функция для создания элемента
    function createLeaf(id, text) {
        return '<li><ul id="' + id + '"><li>leaf: id = ' + id + ' text: <label>' + text + '</label></li></ul></li>'
    }

    //Функция для заполнения селекторов веток
    function fillSelectBranches(id) {
        if (id != undefined) {
            $('.branch').append('<option>' + id + '</option>');
        }
    }

    //Функция для заполнения селектора элементов
    function fillSelectLeaves(id) {
        if (id != undefined) {
            $('#fourthSelect').append('<option>' + id + '</option>');
        }
    }

    //Функция для заполнения селекторов веток
    function deleteFromtreeBranches() {
        $('.branch').children().detach();
        $('#fourthSelect').children().detach();

        $('.branch').append('<option>-- Выберите ветку --</option>');
        $('#fourthSelect').append('<option>-- Выберите элемент --</option>');

        treeBranches = [];
        treeLeaves = [];

        var id;

        $('ul').each(function (index, element) {

            id = $(element).attr("id");

            var reg = /^br_/;
            var reg1 = /^leaf_/;

            if (reg.test(id)) {
                $('.branch').append('<option>' + id + '</option>');
            }
            else if (reg1.test(id)) {
                $('#fourthSelect').append('<option>' + id + '</option>');
            }
        });
    }

    //Функция для заполнения селекторов элементов
    function deleteFromtreeLeaves() {
        $('#fourthSelect').children().detach();
        $('#fourthSelect').append('<option>-- Выберите элемент --</option>');

        treeLeaves = [];

        var id;

        $('ul').each(function (index, element) {

            id = $(element).attr("id");

            var reg = /^leaf_/;

            if (reg.test(id)) {
                $('#fourthSelect').append('<option>' + id + '</option>');
            }
        });
    }

    //Обработчик события при нажатии кнопки добавить ветку
    var btn_add_branch = $('#btn_add_branch').bind('click', function (e) {
        e.preventDefault();

        var branch = $('#firstSelect option:selected').val();

        if (branch != "-- Выберите ветку --") {

            var id = 'br_' + parseInt(++branchesId);

            var temp = $('#' + branch).append(createBranch(id));

            fillSelectBranches(id);
        }
        else {
            var id = 'br_' + parseInt(++branchesId);

            var temp = $('#tree').append(createBranch(id));

            fillSelectBranches(id);
        }
    });

    //Обработчик события при нажатии кнопки удалить ветку
    var btn_del_branch = $('#btn_del_branch').bind('click', function (e) {
        e.preventDefault();

        var branch = $('#firstSelect option:selected').val();

        if (branch != '-- Выберите элемент --') {

            var temp = $('#' + branch).children();

            temp.splice(0, 1);

            if (temp.length > 0) {
                var flag = confirm('У этого элемента есть дочерние элементы! Вы хотите удалить их? \nOk - удалить. \nОтмена - перенести дочерние элементы ветки в ближайшую родительскую ветку');
                if (flag) {
                    $('#' + branch).parent().remove();
                }
                else {
                    var parent = $('#' + branch).parent().parent();

                    $('#' + branch).parent().remove();

                    parent.append(temp);
                }
            }
            else {
                $('#' + branch).parent().remove();
            }

            deleteFromtreeBranches();
        }
        else {
            alert('Необходимо выбрать ветку для удаления !!!');
        }

    });

    //Обработчик события при нажатии кнопки переместить ветку
    var btn_post_branch = $('#btn_post_branch').bind('click', function (e) {
        e.preventDefault();

        var parentBranch = $('#firstSelect option:selected').val();

        if (parentBranch != '-- Выберите элемент --') {

            var childBranch = $('#secondSelect option:selected').val();

            if (childBranch != '-- Выберите элемент --') {

                var parentNode = document.getElementById(parentBranch);
                var childtNode = document.getElementById(childBranch);

                var res = parentNode.compareDocumentPosition(childtNode);

                if (res == 10) {
                    var flag = confirm('Вы действительно хотите перенести родительский элемент в его дочернюю ветку ? \nОк - да, перенести. \nОтмена - нет, отказаться');
                    if (flag) {

                        var temp = $('#' + childBranch).children();

                        temp.splice(0, 1);                    

                        var parent = $('#' + childBranch).parent().parent();

                        var t1 = $('#' + childBranch).parent().remove();

                        parent.append(temp);

                        $('#' + parentBranch).append(t1);
                    }
                    else {
                        
                    }
                }
                else if(res == 0){
          
                }
                else {

                    var temp = $('#' + childBranch).parent().remove();

                    var parent = $('#' + parentBranch).append(temp);
                }

                console.log(res);
            }
            else {
                alert('Необходимо выбрать ветку для переноса !!!');
            }
        }
        else {
            alert('Необходимо выбрать родительскую ветку !!!');
        }

    });

    //Обработчик события при нажатии кнопки добавить элемент
    var btn_add_leaf = $('#btn_add_leaf').bind('click', function (e) {
        e.preventDefault();

        var branch = $('#thirdSelect option:selected').val();

        if (branch != '-- Выберите элемент --') {

            var id = 'leaf_' + parseInt(++leavesId);

            var text = $('#elementText').val();

            var temp = $('#' + branch).append(createLeaf(id, text));

            fillSelectLeaves(id);
        }
        else {
            alert('Необходимо выбрать родительскую ветку !!!');
        }
    });

    //Обработчик события при нажатии кнопки удалить элемент
    var btn_del_leaf = $('#btn_del_leaf').bind('click', function (e) {
        e.preventDefault();

        var leaf = $('#fourthSelect option:selected').val();

        if (leaf != '-- Выберите элемент --') {

            $('#' + leaf).parent().remove();

            deleteFromtreeLeaves()
        }
        else {
            alert('Необходимо выбрать элемент для удаления !!!');
        }
    });

    //Обработчик события при нажатии кнопки переместить элемент
    var btn_post_leaf = $('#btn_post_leaf').bind('click', function (e) {
        e.preventDefault();

        var parentBranch = $('#thirdSelect option:selected').val();

        if (parentBranch != '-- Выберите элемент --') {

            var leaf = $('#fourthSelect option:selected').val();

            if (leaf != '-- Выберите элемент --') {

                var temp = $('#' + leaf).parent().remove();

                var parent = $('#' + parentBranch).append(temp);
            }
            else {
                alert('Необходимо выбрать элемент для переноса !!!');
            }
        }
        else {
            alert('Необходимо выбрать родительскую ветку !!!');
        }

    });
});