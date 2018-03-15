$(window).load(function() {

$(function() {
    CenterCropImage($('.img-resize'));
    $(window).resize(function(){
        CenterCropImage($('.img-resize'));
    })
});

/***CENTER CROP IMAGE***/
function CenterCropImage(x){
    x.each(function(){
        $(this).children('img').load(function(){
            ContentBox=$(this).parent();
            PropBox=getProportions(ContentBox);

            ImgtoResize=$(this);
            PropImg=getProportions(ImgtoResize);
            if(PropBox>PropImg){
                ProportionVertical(ImgtoResize)
            }
            else{
                ProportionHorizontal(ImgtoResize)
            }
        });
        ContentBox=$(this);
        PropBox=getProportions(ContentBox);

        ImgtoResize=$(this).children('img');
        PropImg=getProportions(ImgtoResize);
        if(PropBox>PropImg){
            ProportionVertical(ImgtoResize)
        }
        else{
            ProportionHorizontal(ImgtoResize)
        }
    })
}


function getProportions(x){
    Height=x.height();
    Width=x.width();
    Prop=Width/Height;
    return Prop
}

function ProportionHorizontal(x){
    x.removeAttr("style");
    x.css({'height':'100%','width':'auto'});
    Wimg=x.width();
    Wcont=x.parent().width();

    MarginLeft=(Wcont-Wimg)/2;
    x.css({'margin-left':MarginLeft})
}

function ProportionVertical(x){
    x.removeAttr("style");
    x.css({'width':'100%','height':'auto'});
    Himg=x.height();
    Hcont=x.parent().height();

    MarginTop=(Hcont-Himg)/2;
    x.css({'margin-top':MarginTop})
}

});