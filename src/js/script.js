$(document).ready(function () {

    var branchesId = 4;
    var leavesId = 4;

    // Создаем и инициируем первоначальными значениями масив для хранения id веток.
    var treeBranches = [];
    treeBranches[0] = 'br_1';
    treeBranches[1] = 'br_2';
    treeBranches[2] = 'br_3';
    treeBranches[3] = 'br_4';

    // Создаем и инициируем первоначальными значениями масив для хранения id листьев.
    var treeLeaves = [];
    treeLeaves[0] = 'leaf_1';
    treeLeaves[1] = 'leaf_2';
    treeLeaves[2] = 'leaf_3';
    treeLeaves[3] = 'leaf_4';


    //Инициируем начальными значениями селекторы для выбора веток.
    fillSelectBranches(treeBranches);

    //Инициируем начальными значениями селекторы для выбора элементов.
    fillSelectLeaves(treeLeaves);

    // функция для создания ветки
    function createBranch(id) {
        return '<ul><li id="' + id + '"><label>Branch: id = ' + id + '</label></li></ul>'
    }

    //Функция для создания элемента
    function createLeaf(id, text) {
        return '<p id="' + id + '">leaf: id = ' + id + ' text: <label>' + text + '</label></p>'
    }

    //Функция для заполнения селекторов веток
    function fillSelectBranches(treeBranches) {

        $('.branch').children().detach();

        for (var i = 0; i <= treeBranches.length; ++i) {
            if (i == 0) {
                $('.branch').append('<option>-- Выберите элемент --</option>')
            }
            else {
                $('.branch').append('<option>' + treeBranches[i - 1] + '</option>')
            }
        }
    }

    //Функция для заполнения селектора элементов
    function fillSelectLeaves(treeLeaves) {
        $('#fourthSelect').children().detach();

        for (var i = 0; i <= treeLeaves.length; ++i) {
            if (i == 0) {
                $('#fourthSelect').append('<option>-- Выберите элемент --</option>')
            }
            else {
                $('#fourthSelect').append('<option>' + treeLeaves[i - 1] + '</option>')
            }
        }
    }

    //Функция для заполнения селекторов веток
    function deleteFromtreeBranches(treeBranches, val) {
        $('.branch').children().detach();

        for (var i = 0; i < treeBranches.length; ++i) {
            if (treeBranches[i] == val) {
                treeBranches.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i <= treeBranches.length; ++i) {
            if (i == 0) {
                $('.branch').append('<option>-- Выберите элемент --</option>')
            }
            else {
                $('.branch').append('<option>' + treeBranches[i - 1] + '</option>')
            }
        }
    }

    //Функция для заполнения селекторов элементов
    function deleteFromtreeLeaves(treeLeaves, val) {
        $('#fourthSelect').children().detach();

        for (var i = 0; i < treeLeaves.length; ++i) {
            if (treeLeaves[i] == val) {
                treeLeaves.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i <= treeLeaves.length; ++i) {
            if (i == 0) {
                $('#fourthSelect').append('<option>-- Выберите элемент --</option>')
            }
            else {
                $('#fourthSelect').append('<option>' + treeLeaves[i - 1] + '</option>')
            }
        }
    }

    //Обработчик события при нажатии кнопки добавить ветку
    var btn_add_branch = $('#btn_add_branch').bind('click', function (e) {
        e.preventDefault();

        var branch = $('#firstSelect option:selected').val();

        if (branch != '-- Выберите элемент --') {

            var id = 'br_' + parseInt(++branchesId);

            treeBranches.push(id);

            var temp = $('#' + branch).append(createBranch(id));

            fillSelectBranches(treeBranches);
        }
        else {
            alert('Необходимо выбрать родительскую ветку !!!');
        }

        console.log(treeBranches);
    });

    //Обработчик события при нажатии кнопки удалить ветку
    var btn_del_branch = $('#btn_del_branch').bind('click', function (e) {
        e.preventDefault();

        var branch = $('#firstSelect option:selected').val();

        if (branch != '-- Выберите элемент --') {

            var temp = $('#' + branch).children();

            temp.splice(0, 1);

            if (temp.length > 0) {
                var flag = confirm('У этого элемента есть дочерние элементы! Вы хотите удалить их? \nДа - удалить. \nНет - перенести дочерние элементы ветки в ближайшую родительскую ветку');
                if (flag) {
                    $('#' + branch).remove();
                }
                else {
                    var parent = $('#' + branch).parent().parent();

                    $('#' + branch).remove();

                    parent.append(temp);
                }
            }
            else {
                $('#' + branch).remove();
            }

            deleteFromtreeBranches(treeBranches, branch)
        }
        else {
            alert('Необходимо выбрать ветку для удаления !!!');
        }

        console.log(treeBranches);
    });

    //Обработчик события при нажатии кнопки переместить ветку
    var btn_post_branch = $('#btn_post_branch').bind('click', function (e) {
        e.preventDefault();

        var parentBranch = $('#firstSelect option:selected').val();

        if (parentBranch != '-- Выберите элемент --') {

            var childBranch = $('#secondSelect option:selected').val();

            if (childBranch != '-- Выберите элемент --') {

                var temp = $('#' + childBranch).parent().remove();

                var parent = $('#' + parentBranch).append(temp);
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

            treeLeaves.push(id);

            var text = $('#elementText').val();

            var temp = $('#' + branch).append(createLeaf(id, text));

            fillSelectLeaves(treeLeaves);
        }
        else {
            alert('Необходимо выбрать родительскую ветку !!!');
        }
        console.log(treeLeaves);
    });

    //Обработчик события при нажатии кнопки удалить элемент
    var btn_del_leaf = $('#btn_del_leaf').bind('click', function (e) {
        e.preventDefault();

        var leaf = $('#fourthSelect option:selected').val();

        if (leaf != '-- Выберите элемент --') {

            $('#' + leaf).remove();

            deleteFromtreeLeaves(treeLeaves, leaf)
        }
        else {
            alert('Необходимо выбрать элемент для удаления !!!');
        }

        console.log(treeLeaves);
    });

    //Обработчик события при нажатии кнопки переместить элемент
    var btn_post_leaf = $('#btn_post_leaf').bind('click', function (e) {
        e.preventDefault();

        var parentBranch = $('#thirdSelect option:selected').val();

        if (parentBranch != '-- Выберите элемент --') {

            var leaf = $('#fourthSelect option:selected').val();

            if (leaf != '-- Выберите элемент --') {

                var temp = $('#' + leaf).remove();

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