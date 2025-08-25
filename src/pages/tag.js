/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 分类页处理
 */
import consoleText from "../vendor/consoleText/consoleText";
import postMeta from "../components/postMeta/postMeta";

export default function main(_) {

   /**
     * 设置文章banner动效
     */
    (() => {
        if (_.__config.animate.articleBanner.enable)
            import(/* webpackChunkName: "nhBannerAnimation" */ '../style/nhBannerAnimation.css');
    })();

    /**
     * 设置标签标题
     */
    (() => {
        // 从标签页面的HTML结构中提取标签标题
        let sbTitle = $('.PostListTitle').text().trim();
        
        // 提取"当前标签："后面的标签名称
        if (sbTitle && sbTitle.includes('当前标签：')) {
            sbTitle = sbTitle.replace('当前标签：', '').trim();
        }
        
        // 如果没有找到标签标题，使用默认标题
        if (!sbTitle) {
            sbTitle = '标签页面';
        }
        
        if (_.__config.animate.articleTitle.enable) {
            consoleText([sbTitle], 'sbTitleText', 'sbTitleConsole', ['#fff'], false, _.__tools.setDomHomePosition);
        } else {
            $('#sbTitleText').text(sbTitle).css('color', '#fff');
        }
        $('.inner').css('max-width', '100vw');
        _.__tools.setDomHomePosition();
    })();

      /**
     * 设置标签页文章信息样式
     */
      (() => {
        // 处理标签页的文章标题
        let titleList = $('.postTitl2');
        $.each(titleList, (i) => {
            let title = $(titleList[i]),
                titleText = title.find('span').text(),
                postDescText = title.nextAll('.postDesc2:eq(0)').text();
            title.after(postMetaHtml(postDescText));
            if (/\[置顶\]/.test(titleText)) title.append('<span class="postSticky">置顶</span>');
            title.find('span').text(titleText.replace('[置顶]', ''));
        });

        function postMetaHtml(postDescText) {
            const { date, vnum, cnum, tnum } = postMeta(postDescText);
            return `<span class="postMeta">
                <i class="simple-memory-iconfont simple-memory-icon-time1"></i>发表于 ${date}
                <i class="simple-memory-iconfont simple-memory-icon-browse"></i>阅读：${vnum}
                <i class="simple-memory-iconfont simple-memory-icon-interactive"></i>评论：${cnum}
                <i class="simple-memory-iconfont simple-memory-icon-hot"></i>推荐：${tnum}
            </span>`;
        }
    })();

     /**
     * 设置摘要文章
     */
     (() => {
        let desc = $('.c_b_p_desc');
        $.each(desc, (i) => {
            let obj = $(desc[i]), img = obj.find('img.desc_img');
            if (img.length > 0) {
                let src = img.attr('src');
                img.hide();
                obj.css('width', '60%');
                obj.parent('div').css('min-height', '150px');
                let html = '<div class="c_b_p_desc_img"><div style="background: url(\''+ src +'\') center center / contain no-repeat;"></div></div>';
                obj.after(html);
            }
        });
    })();
}