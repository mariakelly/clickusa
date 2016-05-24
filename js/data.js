var parseMapData = function (id) {
    var data = {};
    var mapDataContainer = $('#'+id+'-data');
    mapDataContainer.hide();
    mapData = mapDataContainer.data();
    data.title = mapData.title;

    mapDataContainer.children().each(function(){
        var stateData = $(this).data();
        data[stateData.state] = {
            legend_key: stateData.legendkey,
            content: $(this).html()
        };
    });

    return data;
};