export var AssetOrderByInput;
(function (AssetOrderByInput) {
    AssetOrderByInput["id_ASC"] = "id_ASC";
    AssetOrderByInput["id_DESC"] = "id_DESC";
    AssetOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    AssetOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    AssetOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    AssetOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    AssetOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    AssetOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    AssetOrderByInput["handle_ASC"] = "handle_ASC";
    AssetOrderByInput["handle_DESC"] = "handle_DESC";
    AssetOrderByInput["fileName_ASC"] = "fileName_ASC";
    AssetOrderByInput["fileName_DESC"] = "fileName_DESC";
    AssetOrderByInput["height_ASC"] = "height_ASC";
    AssetOrderByInput["height_DESC"] = "height_DESC";
    AssetOrderByInput["width_ASC"] = "width_ASC";
    AssetOrderByInput["width_DESC"] = "width_DESC";
    AssetOrderByInput["size_ASC"] = "size_ASC";
    AssetOrderByInput["size_DESC"] = "size_DESC";
    AssetOrderByInput["mimeType_ASC"] = "mimeType_ASC";
    AssetOrderByInput["mimeType_DESC"] = "mimeType_DESC";
    AssetOrderByInput["alt_ASC"] = "alt_ASC";
    AssetOrderByInput["alt_DESC"] = "alt_DESC";
})(AssetOrderByInput || (AssetOrderByInput = {}));
export var DocumentFileTypes;
(function (DocumentFileTypes) {
    DocumentFileTypes["jpg"] = "jpg";
    DocumentFileTypes["odp"] = "odp";
    DocumentFileTypes["ods"] = "ods";
    DocumentFileTypes["odt"] = "odt";
    DocumentFileTypes["png"] = "png";
    DocumentFileTypes["svg"] = "svg";
    DocumentFileTypes["txt"] = "txt";
    DocumentFileTypes["webp"] = "webp";
    DocumentFileTypes["docx"] = "docx";
    DocumentFileTypes["pdf"] = "pdf";
    DocumentFileTypes["html"] = "html";
    DocumentFileTypes["doc"] = "doc";
    DocumentFileTypes["xlsx"] = "xlsx";
    DocumentFileTypes["xls"] = "xls";
    DocumentFileTypes["pptx"] = "pptx";
    DocumentFileTypes["ppt"] = "ppt";
})(DocumentFileTypes || (DocumentFileTypes = {}));
export var FooterOrderByInput;
(function (FooterOrderByInput) {
    FooterOrderByInput["id_ASC"] = "id_ASC";
    FooterOrderByInput["id_DESC"] = "id_DESC";
    FooterOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    FooterOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    FooterOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    FooterOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    FooterOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    FooterOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    FooterOrderByInput["identity_ASC"] = "identity_ASC";
    FooterOrderByInput["identity_DESC"] = "identity_DESC";
    FooterOrderByInput["copyright_ASC"] = "copyright_ASC";
    FooterOrderByInput["copyright_DESC"] = "copyright_DESC";
})(FooterOrderByInput || (FooterOrderByInput = {}));
export var ImageFit;
(function (ImageFit) {
    /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
    ImageFit["clip"] = "clip";
    /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
    ImageFit["crop"] = "crop";
    /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
    ImageFit["scale"] = "scale";
    /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
    ImageFit["max"] = "max";
})(ImageFit || (ImageFit = {}));
/** Locale system enumeration */
export var Locale;
(function (Locale) {
    /** System locale */
    Locale["en"] = "en";
})(Locale || (Locale = {}));
export var MagentoCategoryOrderByInput;
(function (MagentoCategoryOrderByInput) {
    MagentoCategoryOrderByInput["id_ASC"] = "id_ASC";
    MagentoCategoryOrderByInput["id_DESC"] = "id_DESC";
    MagentoCategoryOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    MagentoCategoryOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    MagentoCategoryOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    MagentoCategoryOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    MagentoCategoryOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    MagentoCategoryOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    MagentoCategoryOrderByInput["url_ASC"] = "url_ASC";
    MagentoCategoryOrderByInput["url_DESC"] = "url_DESC";
    MagentoCategoryOrderByInput["category_ASC"] = "category_ASC";
    MagentoCategoryOrderByInput["category_DESC"] = "category_DESC";
})(MagentoCategoryOrderByInput || (MagentoCategoryOrderByInput = {}));
export var MetaRobots;
(function (MetaRobots) {
    MetaRobots["INDEX_FOLLOW"] = "INDEX_FOLLOW";
    MetaRobots["INDEX_NOFOLLOW"] = "INDEX_NOFOLLOW";
    MetaRobots["NOINDEX_FOLLOW"] = "NOINDEX_FOLLOW";
    MetaRobots["NOINDEX_NOFOLLOW"] = "NOINDEX_NOFOLLOW";
})(MetaRobots || (MetaRobots = {}));
export var PageLinkOrderByInput;
(function (PageLinkOrderByInput) {
    PageLinkOrderByInput["id_ASC"] = "id_ASC";
    PageLinkOrderByInput["id_DESC"] = "id_DESC";
    PageLinkOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    PageLinkOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    PageLinkOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    PageLinkOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    PageLinkOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    PageLinkOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    PageLinkOrderByInput["title_ASC"] = "title_ASC";
    PageLinkOrderByInput["title_DESC"] = "title_DESC";
    PageLinkOrderByInput["url_ASC"] = "url_ASC";
    PageLinkOrderByInput["url_DESC"] = "url_DESC";
})(PageLinkOrderByInput || (PageLinkOrderByInput = {}));
export var PageOrderByInput;
(function (PageOrderByInput) {
    PageOrderByInput["id_ASC"] = "id_ASC";
    PageOrderByInput["id_DESC"] = "id_DESC";
    PageOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    PageOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    PageOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    PageOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    PageOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    PageOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    PageOrderByInput["url_ASC"] = "url_ASC";
    PageOrderByInput["url_DESC"] = "url_DESC";
    PageOrderByInput["title_ASC"] = "title_ASC";
    PageOrderByInput["title_DESC"] = "title_DESC";
    PageOrderByInput["metaTitle_ASC"] = "metaTitle_ASC";
    PageOrderByInput["metaTitle_DESC"] = "metaTitle_DESC";
    PageOrderByInput["metaDescription_ASC"] = "metaDescription_ASC";
    PageOrderByInput["metaDescription_DESC"] = "metaDescription_DESC";
    PageOrderByInput["date_ASC"] = "date_ASC";
    PageOrderByInput["date_DESC"] = "date_DESC";
    PageOrderByInput["author_ASC"] = "author_ASC";
    PageOrderByInput["author_DESC"] = "author_DESC";
    PageOrderByInput["metaRobots_ASC"] = "metaRobots_ASC";
    PageOrderByInput["metaRobots_DESC"] = "metaRobots_DESC";
})(PageOrderByInput || (PageOrderByInput = {}));
export var ProductOrderByInput;
(function (ProductOrderByInput) {
    ProductOrderByInput["id_ASC"] = "id_ASC";
    ProductOrderByInput["id_DESC"] = "id_DESC";
    ProductOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    ProductOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    ProductOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    ProductOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    ProductOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    ProductOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    ProductOrderByInput["url_ASC"] = "url_ASC";
    ProductOrderByInput["url_DESC"] = "url_DESC";
})(ProductOrderByInput || (ProductOrderByInput = {}));
export var RowBlogContentOrderByInput;
(function (RowBlogContentOrderByInput) {
    RowBlogContentOrderByInput["id_ASC"] = "id_ASC";
    RowBlogContentOrderByInput["id_DESC"] = "id_DESC";
    RowBlogContentOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowBlogContentOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowBlogContentOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowBlogContentOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowBlogContentOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowBlogContentOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowBlogContentOrderByInput["identity_ASC"] = "identity_ASC";
    RowBlogContentOrderByInput["identity_DESC"] = "identity_DESC";
})(RowBlogContentOrderByInput || (RowBlogContentOrderByInput = {}));
export var RowButtonLinkListOrderByInput;
(function (RowButtonLinkListOrderByInput) {
    RowButtonLinkListOrderByInput["id_ASC"] = "id_ASC";
    RowButtonLinkListOrderByInput["id_DESC"] = "id_DESC";
    RowButtonLinkListOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowButtonLinkListOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowButtonLinkListOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowButtonLinkListOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowButtonLinkListOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowButtonLinkListOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowButtonLinkListOrderByInput["identity_ASC"] = "identity_ASC";
    RowButtonLinkListOrderByInput["identity_DESC"] = "identity_DESC";
    RowButtonLinkListOrderByInput["title_ASC"] = "title_ASC";
    RowButtonLinkListOrderByInput["title_DESC"] = "title_DESC";
})(RowButtonLinkListOrderByInput || (RowButtonLinkListOrderByInput = {}));
export var RowColumnOneOrderByInput;
(function (RowColumnOneOrderByInput) {
    RowColumnOneOrderByInput["id_ASC"] = "id_ASC";
    RowColumnOneOrderByInput["id_DESC"] = "id_DESC";
    RowColumnOneOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowColumnOneOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowColumnOneOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowColumnOneOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowColumnOneOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowColumnOneOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowColumnOneOrderByInput["identity_ASC"] = "identity_ASC";
    RowColumnOneOrderByInput["identity_DESC"] = "identity_DESC";
})(RowColumnOneOrderByInput || (RowColumnOneOrderByInput = {}));
export var RowColumnThreeOrderByInput;
(function (RowColumnThreeOrderByInput) {
    RowColumnThreeOrderByInput["id_ASC"] = "id_ASC";
    RowColumnThreeOrderByInput["id_DESC"] = "id_DESC";
    RowColumnThreeOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowColumnThreeOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowColumnThreeOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowColumnThreeOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowColumnThreeOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowColumnThreeOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowColumnThreeOrderByInput["identity_ASC"] = "identity_ASC";
    RowColumnThreeOrderByInput["identity_DESC"] = "identity_DESC";
})(RowColumnThreeOrderByInput || (RowColumnThreeOrderByInput = {}));
export var RowColumnTwoOrderByInput;
(function (RowColumnTwoOrderByInput) {
    RowColumnTwoOrderByInput["id_ASC"] = "id_ASC";
    RowColumnTwoOrderByInput["id_DESC"] = "id_DESC";
    RowColumnTwoOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowColumnTwoOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowColumnTwoOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowColumnTwoOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowColumnTwoOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowColumnTwoOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowColumnTwoOrderByInput["identity_ASC"] = "identity_ASC";
    RowColumnTwoOrderByInput["identity_DESC"] = "identity_DESC";
})(RowColumnTwoOrderByInput || (RowColumnTwoOrderByInput = {}));
export var RowContentLinksOrderByInput;
(function (RowContentLinksOrderByInput) {
    RowContentLinksOrderByInput["id_ASC"] = "id_ASC";
    RowContentLinksOrderByInput["id_DESC"] = "id_DESC";
    RowContentLinksOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowContentLinksOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowContentLinksOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowContentLinksOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowContentLinksOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowContentLinksOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowContentLinksOrderByInput["identity_ASC"] = "identity_ASC";
    RowContentLinksOrderByInput["identity_DESC"] = "identity_DESC";
    RowContentLinksOrderByInput["title_ASC"] = "title_ASC";
    RowContentLinksOrderByInput["title_DESC"] = "title_DESC";
})(RowContentLinksOrderByInput || (RowContentLinksOrderByInput = {}));
export var RowHeroBannerOrderByInput;
(function (RowHeroBannerOrderByInput) {
    RowHeroBannerOrderByInput["id_ASC"] = "id_ASC";
    RowHeroBannerOrderByInput["id_DESC"] = "id_DESC";
    RowHeroBannerOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowHeroBannerOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowHeroBannerOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowHeroBannerOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowHeroBannerOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowHeroBannerOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowHeroBannerOrderByInput["identity_ASC"] = "identity_ASC";
    RowHeroBannerOrderByInput["identity_DESC"] = "identity_DESC";
})(RowHeroBannerOrderByInput || (RowHeroBannerOrderByInput = {}));
export var RowProductBackstoryOrderByInput;
(function (RowProductBackstoryOrderByInput) {
    RowProductBackstoryOrderByInput["id_ASC"] = "id_ASC";
    RowProductBackstoryOrderByInput["id_DESC"] = "id_DESC";
    RowProductBackstoryOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductBackstoryOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductBackstoryOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductBackstoryOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductBackstoryOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductBackstoryOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductBackstoryOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductBackstoryOrderByInput["identity_DESC"] = "identity_DESC";
})(RowProductBackstoryOrderByInput || (RowProductBackstoryOrderByInput = {}));
export var RowProductFeatureBoxedOrderByInput;
(function (RowProductFeatureBoxedOrderByInput) {
    RowProductFeatureBoxedOrderByInput["id_ASC"] = "id_ASC";
    RowProductFeatureBoxedOrderByInput["id_DESC"] = "id_DESC";
    RowProductFeatureBoxedOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductFeatureBoxedOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductFeatureBoxedOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductFeatureBoxedOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductFeatureBoxedOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductFeatureBoxedOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductFeatureBoxedOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductFeatureBoxedOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductFeatureBoxedOrderByInput["topic_ASC"] = "topic_ASC";
    RowProductFeatureBoxedOrderByInput["topic_DESC"] = "topic_DESC";
})(RowProductFeatureBoxedOrderByInput || (RowProductFeatureBoxedOrderByInput = {}));
export var RowProductFeatureOrderByInput;
(function (RowProductFeatureOrderByInput) {
    RowProductFeatureOrderByInput["id_ASC"] = "id_ASC";
    RowProductFeatureOrderByInput["id_DESC"] = "id_DESC";
    RowProductFeatureOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductFeatureOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductFeatureOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductFeatureOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductFeatureOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductFeatureOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductFeatureOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductFeatureOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductFeatureOrderByInput["topic_ASC"] = "topic_ASC";
    RowProductFeatureOrderByInput["topic_DESC"] = "topic_DESC";
})(RowProductFeatureOrderByInput || (RowProductFeatureOrderByInput = {}));
export var RowProductGridOrderByInput;
(function (RowProductGridOrderByInput) {
    RowProductGridOrderByInput["id_ASC"] = "id_ASC";
    RowProductGridOrderByInput["id_DESC"] = "id_DESC";
    RowProductGridOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductGridOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductGridOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductGridOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductGridOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductGridOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductGridOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductGridOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductGridOrderByInput["title_ASC"] = "title_ASC";
    RowProductGridOrderByInput["title_DESC"] = "title_DESC";
})(RowProductGridOrderByInput || (RowProductGridOrderByInput = {}));
export var RowProductRelatedOrderByInput;
(function (RowProductRelatedOrderByInput) {
    RowProductRelatedOrderByInput["id_ASC"] = "id_ASC";
    RowProductRelatedOrderByInput["id_DESC"] = "id_DESC";
    RowProductRelatedOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductRelatedOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductRelatedOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductRelatedOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductRelatedOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductRelatedOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductRelatedOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductRelatedOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductRelatedOrderByInput["title_ASC"] = "title_ASC";
    RowProductRelatedOrderByInput["title_DESC"] = "title_DESC";
})(RowProductRelatedOrderByInput || (RowProductRelatedOrderByInput = {}));
export var RowProductReviewsOrderByInput;
(function (RowProductReviewsOrderByInput) {
    RowProductReviewsOrderByInput["id_ASC"] = "id_ASC";
    RowProductReviewsOrderByInput["id_DESC"] = "id_DESC";
    RowProductReviewsOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductReviewsOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductReviewsOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductReviewsOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductReviewsOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductReviewsOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductReviewsOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductReviewsOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductReviewsOrderByInput["title_ASC"] = "title_ASC";
    RowProductReviewsOrderByInput["title_DESC"] = "title_DESC";
})(RowProductReviewsOrderByInput || (RowProductReviewsOrderByInput = {}));
export var RowProductSpecsOrderByInput;
(function (RowProductSpecsOrderByInput) {
    RowProductSpecsOrderByInput["id_ASC"] = "id_ASC";
    RowProductSpecsOrderByInput["id_DESC"] = "id_DESC";
    RowProductSpecsOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductSpecsOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductSpecsOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductSpecsOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductSpecsOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductSpecsOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductSpecsOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductSpecsOrderByInput["identity_DESC"] = "identity_DESC";
})(RowProductSpecsOrderByInput || (RowProductSpecsOrderByInput = {}));
export var RowProductUpsellsOrderByInput;
(function (RowProductUpsellsOrderByInput) {
    RowProductUpsellsOrderByInput["id_ASC"] = "id_ASC";
    RowProductUpsellsOrderByInput["id_DESC"] = "id_DESC";
    RowProductUpsellsOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowProductUpsellsOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowProductUpsellsOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowProductUpsellsOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowProductUpsellsOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowProductUpsellsOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowProductUpsellsOrderByInput["identity_ASC"] = "identity_ASC";
    RowProductUpsellsOrderByInput["identity_DESC"] = "identity_DESC";
    RowProductUpsellsOrderByInput["title_ASC"] = "title_ASC";
    RowProductUpsellsOrderByInput["title_DESC"] = "title_DESC";
})(RowProductUpsellsOrderByInput || (RowProductUpsellsOrderByInput = {}));
export var RowQuoteOrderByInput;
(function (RowQuoteOrderByInput) {
    RowQuoteOrderByInput["id_ASC"] = "id_ASC";
    RowQuoteOrderByInput["id_DESC"] = "id_DESC";
    RowQuoteOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowQuoteOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowQuoteOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowQuoteOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowQuoteOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowQuoteOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowQuoteOrderByInput["identity_ASC"] = "identity_ASC";
    RowQuoteOrderByInput["identity_DESC"] = "identity_DESC";
})(RowQuoteOrderByInput || (RowQuoteOrderByInput = {}));
export var RowServiceOptionsOrderByInput;
(function (RowServiceOptionsOrderByInput) {
    RowServiceOptionsOrderByInput["id_ASC"] = "id_ASC";
    RowServiceOptionsOrderByInput["id_DESC"] = "id_DESC";
    RowServiceOptionsOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowServiceOptionsOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowServiceOptionsOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowServiceOptionsOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowServiceOptionsOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowServiceOptionsOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowServiceOptionsOrderByInput["identity_ASC"] = "identity_ASC";
    RowServiceOptionsOrderByInput["identity_DESC"] = "identity_DESC";
    RowServiceOptionsOrderByInput["title_ASC"] = "title_ASC";
    RowServiceOptionsOrderByInput["title_DESC"] = "title_DESC";
})(RowServiceOptionsOrderByInput || (RowServiceOptionsOrderByInput = {}));
export var RowSpecialBannerOrderByInput;
(function (RowSpecialBannerOrderByInput) {
    RowSpecialBannerOrderByInput["id_ASC"] = "id_ASC";
    RowSpecialBannerOrderByInput["id_DESC"] = "id_DESC";
    RowSpecialBannerOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowSpecialBannerOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowSpecialBannerOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowSpecialBannerOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowSpecialBannerOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowSpecialBannerOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowSpecialBannerOrderByInput["identity_ASC"] = "identity_ASC";
    RowSpecialBannerOrderByInput["identity_DESC"] = "identity_DESC";
    RowSpecialBannerOrderByInput["topic_ASC"] = "topic_ASC";
    RowSpecialBannerOrderByInput["topic_DESC"] = "topic_DESC";
})(RowSpecialBannerOrderByInput || (RowSpecialBannerOrderByInput = {}));
export var RowSwipeableGridOrderByInput;
(function (RowSwipeableGridOrderByInput) {
    RowSwipeableGridOrderByInput["id_ASC"] = "id_ASC";
    RowSwipeableGridOrderByInput["id_DESC"] = "id_DESC";
    RowSwipeableGridOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    RowSwipeableGridOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    RowSwipeableGridOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    RowSwipeableGridOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    RowSwipeableGridOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    RowSwipeableGridOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    RowSwipeableGridOrderByInput["identity_ASC"] = "identity_ASC";
    RowSwipeableGridOrderByInput["identity_DESC"] = "identity_DESC";
    RowSwipeableGridOrderByInput["title_ASC"] = "title_ASC";
    RowSwipeableGridOrderByInput["title_DESC"] = "title_DESC";
})(RowSwipeableGridOrderByInput || (RowSwipeableGridOrderByInput = {}));
/** Stage system enumeration */
export var Stage;
(function (Stage) {
    /** The Draft is the default stage for all your content. */
    Stage["DRAFT"] = "DRAFT";
    /** The Published stage is where you can publish your content to. */
    Stage["PUBLISHED"] = "PUBLISHED";
})(Stage || (Stage = {}));
export var SystemDateTimeFieldVariation;
(function (SystemDateTimeFieldVariation) {
    SystemDateTimeFieldVariation["BASE"] = "BASE";
    SystemDateTimeFieldVariation["LOCALIZATION"] = "LOCALIZATION";
    SystemDateTimeFieldVariation["COMBINED"] = "COMBINED";
})(SystemDateTimeFieldVariation || (SystemDateTimeFieldVariation = {}));
/** System User Kind */
export var UserKind;
(function (UserKind) {
    UserKind["MEMBER"] = "MEMBER";
    UserKind["PAT"] = "PAT";
    UserKind["PUBLIC"] = "PUBLIC";
    UserKind["WEBHOOK"] = "WEBHOOK";
})(UserKind || (UserKind = {}));
export var UserOrderByInput;
(function (UserOrderByInput) {
    UserOrderByInput["id_ASC"] = "id_ASC";
    UserOrderByInput["id_DESC"] = "id_DESC";
    UserOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    UserOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    UserOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    UserOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    UserOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    UserOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    UserOrderByInput["name_ASC"] = "name_ASC";
    UserOrderByInput["name_DESC"] = "name_DESC";
    UserOrderByInput["picture_ASC"] = "picture_ASC";
    UserOrderByInput["picture_DESC"] = "picture_DESC";
    UserOrderByInput["isActive_ASC"] = "isActive_ASC";
    UserOrderByInput["isActive_DESC"] = "isActive_DESC";
    UserOrderByInput["kind_ASC"] = "kind_ASC";
    UserOrderByInput["kind_DESC"] = "kind_DESC";
})(UserOrderByInput || (UserOrderByInput = {}));
export var UspsOrderByInput;
(function (UspsOrderByInput) {
    UspsOrderByInput["id_ASC"] = "id_ASC";
    UspsOrderByInput["id_DESC"] = "id_DESC";
    UspsOrderByInput["createdAt_ASC"] = "createdAt_ASC";
    UspsOrderByInput["createdAt_DESC"] = "createdAt_DESC";
    UspsOrderByInput["updatedAt_ASC"] = "updatedAt_ASC";
    UspsOrderByInput["updatedAt_DESC"] = "updatedAt_DESC";
    UspsOrderByInput["publishedAt_ASC"] = "publishedAt_ASC";
    UspsOrderByInput["publishedAt_DESC"] = "publishedAt_DESC";
    UspsOrderByInput["identity_ASC"] = "identity_ASC";
    UspsOrderByInput["identity_DESC"] = "identity_DESC";
})(UspsOrderByInput || (UspsOrderByInput = {}));
export var _FilterKind;
(function (_FilterKind) {
    _FilterKind["search"] = "search";
    _FilterKind["AND"] = "AND";
    _FilterKind["OR"] = "OR";
    _FilterKind["NOT"] = "NOT";
    _FilterKind["eq"] = "eq";
    _FilterKind["eq_not"] = "eq_not";
    _FilterKind["in"] = "in";
    _FilterKind["not_in"] = "not_in";
    _FilterKind["lt"] = "lt";
    _FilterKind["lte"] = "lte";
    _FilterKind["gt"] = "gt";
    _FilterKind["gte"] = "gte";
    _FilterKind["contains"] = "contains";
    _FilterKind["not_contains"] = "not_contains";
    _FilterKind["starts_with"] = "starts_with";
    _FilterKind["not_starts_with"] = "not_starts_with";
    _FilterKind["ends_with"] = "ends_with";
    _FilterKind["not_ends_with"] = "not_ends_with";
    _FilterKind["contains_all"] = "contains_all";
    _FilterKind["contains_some"] = "contains_some";
    _FilterKind["contains_none"] = "contains_none";
    _FilterKind["relational_single"] = "relational_single";
    _FilterKind["relational_every"] = "relational_every";
    _FilterKind["relational_some"] = "relational_some";
    _FilterKind["relational_none"] = "relational_none";
})(_FilterKind || (_FilterKind = {}));
export var _MutationInputFieldKind;
(function (_MutationInputFieldKind) {
    _MutationInputFieldKind["scalar"] = "scalar";
    _MutationInputFieldKind["richText"] = "richText";
    _MutationInputFieldKind["richTextWithEmbeds"] = "richTextWithEmbeds";
    _MutationInputFieldKind["enum"] = "enum";
    _MutationInputFieldKind["relation"] = "relation";
    _MutationInputFieldKind["union"] = "union";
    _MutationInputFieldKind["virtual"] = "virtual";
})(_MutationInputFieldKind || (_MutationInputFieldKind = {}));
export var _MutationKind;
(function (_MutationKind) {
    _MutationKind["create"] = "create";
    _MutationKind["publish"] = "publish";
    _MutationKind["unpublish"] = "unpublish";
    _MutationKind["update"] = "update";
    _MutationKind["upsert"] = "upsert";
    _MutationKind["delete"] = "delete";
    _MutationKind["updateMany"] = "updateMany";
    _MutationKind["publishMany"] = "publishMany";
    _MutationKind["unpublishMany"] = "unpublishMany";
    _MutationKind["deleteMany"] = "deleteMany";
})(_MutationKind || (_MutationKind = {}));
export var _OrderDirection;
(function (_OrderDirection) {
    _OrderDirection["asc"] = "asc";
    _OrderDirection["desc"] = "desc";
})(_OrderDirection || (_OrderDirection = {}));
export var _RelationInputCardinality;
(function (_RelationInputCardinality) {
    _RelationInputCardinality["one"] = "one";
    _RelationInputCardinality["many"] = "many";
})(_RelationInputCardinality || (_RelationInputCardinality = {}));
export var _RelationInputKind;
(function (_RelationInputKind) {
    _RelationInputKind["create"] = "create";
    _RelationInputKind["update"] = "update";
})(_RelationInputKind || (_RelationInputKind = {}));
export var _RelationKind;
(function (_RelationKind) {
    _RelationKind["regular"] = "regular";
    _RelationKind["union"] = "union";
})(_RelationKind || (_RelationKind = {}));
export var _SystemDateTimeFieldVariation;
(function (_SystemDateTimeFieldVariation) {
    _SystemDateTimeFieldVariation["base"] = "base";
    _SystemDateTimeFieldVariation["localization"] = "localization";
    _SystemDateTimeFieldVariation["combined"] = "combined";
})(_SystemDateTimeFieldVariation || (_SystemDateTimeFieldVariation = {}));
/** This enumeration display settings for the fixed product tax */
export var FixedProductTaxDisplaySettings;
(function (FixedProductTaxDisplaySettings) {
    /** The displayed price includes the FPT amount without displaying the ProductPrice.fixed_product_taxes values. This value corresponds to 'Including FPT only' */
    FixedProductTaxDisplaySettings["INCLUDE_FPT_WITHOUT_DETAILS"] = "INCLUDE_FPT_WITHOUT_DETAILS";
    /** The displayed price includes the FPT amount while displaying the values of ProductPrice.fixed_product_taxes separately. This value corresponds to 'Including FPT and FPT description' */
    FixedProductTaxDisplaySettings["INCLUDE_FPT_WITH_DETAILS"] = "INCLUDE_FPT_WITH_DETAILS";
    /** The displayed price does not include the FPT amount. The values of ProductPrice.fixed_product_taxes and the price including the FPT are displayed separately. This value corresponds to 'Excluding FPT, Including FPT description and final price' */
    FixedProductTaxDisplaySettings["EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS"] = "EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS";
    /** The displayed price does not include the FPT amount. The values from ProductPrice.fixed_product_taxes are not displayed. This value corresponds to 'Excluding FPT' */
    FixedProductTaxDisplaySettings["EXCLUDE_FPT_WITHOUT_DETAILS"] = "EXCLUDE_FPT_WITHOUT_DETAILS";
    /** The FPT feature is not enabled. You can omit  ProductPrice.fixed_product_taxes from your query */
    FixedProductTaxDisplaySettings["FPT_DISABLED"] = "FPT_DISABLED";
})(FixedProductTaxDisplaySettings || (FixedProductTaxDisplaySettings = {}));
/** The list of available currency codes */
export var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum["AFN"] = "AFN";
    CurrencyEnum["ALL"] = "ALL";
    CurrencyEnum["AZN"] = "AZN";
    CurrencyEnum["DZD"] = "DZD";
    CurrencyEnum["AOA"] = "AOA";
    CurrencyEnum["ARS"] = "ARS";
    CurrencyEnum["AMD"] = "AMD";
    CurrencyEnum["AWG"] = "AWG";
    CurrencyEnum["AUD"] = "AUD";
    CurrencyEnum["BSD"] = "BSD";
    CurrencyEnum["BHD"] = "BHD";
    CurrencyEnum["BDT"] = "BDT";
    CurrencyEnum["BBD"] = "BBD";
    CurrencyEnum["BYN"] = "BYN";
    CurrencyEnum["BZD"] = "BZD";
    CurrencyEnum["BMD"] = "BMD";
    CurrencyEnum["BTN"] = "BTN";
    CurrencyEnum["BOB"] = "BOB";
    CurrencyEnum["BAM"] = "BAM";
    CurrencyEnum["BWP"] = "BWP";
    CurrencyEnum["BRL"] = "BRL";
    CurrencyEnum["GBP"] = "GBP";
    CurrencyEnum["BND"] = "BND";
    CurrencyEnum["BGN"] = "BGN";
    CurrencyEnum["BUK"] = "BUK";
    CurrencyEnum["BIF"] = "BIF";
    CurrencyEnum["KHR"] = "KHR";
    CurrencyEnum["CAD"] = "CAD";
    CurrencyEnum["CVE"] = "CVE";
    CurrencyEnum["CZK"] = "CZK";
    CurrencyEnum["KYD"] = "KYD";
    CurrencyEnum["GQE"] = "GQE";
    CurrencyEnum["CLP"] = "CLP";
    CurrencyEnum["CNY"] = "CNY";
    CurrencyEnum["COP"] = "COP";
    CurrencyEnum["KMF"] = "KMF";
    CurrencyEnum["CDF"] = "CDF";
    CurrencyEnum["CRC"] = "CRC";
    CurrencyEnum["HRK"] = "HRK";
    CurrencyEnum["CUP"] = "CUP";
    CurrencyEnum["DKK"] = "DKK";
    CurrencyEnum["DJF"] = "DJF";
    CurrencyEnum["DOP"] = "DOP";
    CurrencyEnum["XCD"] = "XCD";
    CurrencyEnum["EGP"] = "EGP";
    CurrencyEnum["SVC"] = "SVC";
    CurrencyEnum["ERN"] = "ERN";
    CurrencyEnum["EEK"] = "EEK";
    CurrencyEnum["ETB"] = "ETB";
    CurrencyEnum["EUR"] = "EUR";
    CurrencyEnum["FKP"] = "FKP";
    CurrencyEnum["FJD"] = "FJD";
    CurrencyEnum["GMD"] = "GMD";
    CurrencyEnum["GEK"] = "GEK";
    CurrencyEnum["GEL"] = "GEL";
    CurrencyEnum["GHS"] = "GHS";
    CurrencyEnum["GIP"] = "GIP";
    CurrencyEnum["GTQ"] = "GTQ";
    CurrencyEnum["GNF"] = "GNF";
    CurrencyEnum["GYD"] = "GYD";
    CurrencyEnum["HTG"] = "HTG";
    CurrencyEnum["HNL"] = "HNL";
    CurrencyEnum["HKD"] = "HKD";
    CurrencyEnum["HUF"] = "HUF";
    CurrencyEnum["ISK"] = "ISK";
    CurrencyEnum["INR"] = "INR";
    CurrencyEnum["IDR"] = "IDR";
    CurrencyEnum["IRR"] = "IRR";
    CurrencyEnum["IQD"] = "IQD";
    CurrencyEnum["ILS"] = "ILS";
    CurrencyEnum["JMD"] = "JMD";
    CurrencyEnum["JPY"] = "JPY";
    CurrencyEnum["JOD"] = "JOD";
    CurrencyEnum["KZT"] = "KZT";
    CurrencyEnum["KES"] = "KES";
    CurrencyEnum["KWD"] = "KWD";
    CurrencyEnum["KGS"] = "KGS";
    CurrencyEnum["LAK"] = "LAK";
    CurrencyEnum["LVL"] = "LVL";
    CurrencyEnum["LBP"] = "LBP";
    CurrencyEnum["LSL"] = "LSL";
    CurrencyEnum["LRD"] = "LRD";
    CurrencyEnum["LYD"] = "LYD";
    CurrencyEnum["LTL"] = "LTL";
    CurrencyEnum["MOP"] = "MOP";
    CurrencyEnum["MKD"] = "MKD";
    CurrencyEnum["MGA"] = "MGA";
    CurrencyEnum["MWK"] = "MWK";
    CurrencyEnum["MYR"] = "MYR";
    CurrencyEnum["MVR"] = "MVR";
    CurrencyEnum["LSM"] = "LSM";
    CurrencyEnum["MRO"] = "MRO";
    CurrencyEnum["MUR"] = "MUR";
    CurrencyEnum["MXN"] = "MXN";
    CurrencyEnum["MDL"] = "MDL";
    CurrencyEnum["MNT"] = "MNT";
    CurrencyEnum["MAD"] = "MAD";
    CurrencyEnum["MZN"] = "MZN";
    CurrencyEnum["MMK"] = "MMK";
    CurrencyEnum["NAD"] = "NAD";
    CurrencyEnum["NPR"] = "NPR";
    CurrencyEnum["ANG"] = "ANG";
    CurrencyEnum["YTL"] = "YTL";
    CurrencyEnum["NZD"] = "NZD";
    CurrencyEnum["NIC"] = "NIC";
    CurrencyEnum["NGN"] = "NGN";
    CurrencyEnum["KPW"] = "KPW";
    CurrencyEnum["NOK"] = "NOK";
    CurrencyEnum["OMR"] = "OMR";
    CurrencyEnum["PKR"] = "PKR";
    CurrencyEnum["PAB"] = "PAB";
    CurrencyEnum["PGK"] = "PGK";
    CurrencyEnum["PYG"] = "PYG";
    CurrencyEnum["PEN"] = "PEN";
    CurrencyEnum["PHP"] = "PHP";
    CurrencyEnum["PLN"] = "PLN";
    CurrencyEnum["QAR"] = "QAR";
    CurrencyEnum["RHD"] = "RHD";
    CurrencyEnum["RON"] = "RON";
    CurrencyEnum["RUB"] = "RUB";
    CurrencyEnum["RWF"] = "RWF";
    CurrencyEnum["SHP"] = "SHP";
    CurrencyEnum["STD"] = "STD";
    CurrencyEnum["SAR"] = "SAR";
    CurrencyEnum["RSD"] = "RSD";
    CurrencyEnum["SCR"] = "SCR";
    CurrencyEnum["SLL"] = "SLL";
    CurrencyEnum["SGD"] = "SGD";
    CurrencyEnum["SKK"] = "SKK";
    CurrencyEnum["SBD"] = "SBD";
    CurrencyEnum["SOS"] = "SOS";
    CurrencyEnum["ZAR"] = "ZAR";
    CurrencyEnum["KRW"] = "KRW";
    CurrencyEnum["LKR"] = "LKR";
    CurrencyEnum["SDG"] = "SDG";
    CurrencyEnum["SRD"] = "SRD";
    CurrencyEnum["SZL"] = "SZL";
    CurrencyEnum["SEK"] = "SEK";
    CurrencyEnum["CHF"] = "CHF";
    CurrencyEnum["SYP"] = "SYP";
    CurrencyEnum["TWD"] = "TWD";
    CurrencyEnum["TJS"] = "TJS";
    CurrencyEnum["TZS"] = "TZS";
    CurrencyEnum["THB"] = "THB";
    CurrencyEnum["TOP"] = "TOP";
    CurrencyEnum["TTD"] = "TTD";
    CurrencyEnum["TND"] = "TND";
    CurrencyEnum["TMM"] = "TMM";
    CurrencyEnum["USD"] = "USD";
    CurrencyEnum["UGX"] = "UGX";
    CurrencyEnum["UAH"] = "UAH";
    CurrencyEnum["AED"] = "AED";
    CurrencyEnum["UYU"] = "UYU";
    CurrencyEnum["UZS"] = "UZS";
    CurrencyEnum["VUV"] = "VUV";
    CurrencyEnum["VEB"] = "VEB";
    CurrencyEnum["VEF"] = "VEF";
    CurrencyEnum["VND"] = "VND";
    CurrencyEnum["CHE"] = "CHE";
    CurrencyEnum["CHW"] = "CHW";
    CurrencyEnum["XOF"] = "XOF";
    CurrencyEnum["WST"] = "WST";
    CurrencyEnum["YER"] = "YER";
    CurrencyEnum["ZMK"] = "ZMK";
    CurrencyEnum["ZWD"] = "ZWD";
    CurrencyEnum["TRY"] = "TRY";
    CurrencyEnum["AZM"] = "AZM";
    CurrencyEnum["ROL"] = "ROL";
    CurrencyEnum["TRL"] = "TRL";
    CurrencyEnum["XPF"] = "XPF";
})(CurrencyEnum || (CurrencyEnum = {}));
/** This enumeration indicates whether to return results in ascending or descending order */
export var SortEnum;
(function (SortEnum) {
    SortEnum["ASC"] = "ASC";
    SortEnum["DESC"] = "DESC";
})(SortEnum || (SortEnum = {}));
/** PriceAdjustment.code is deprecated. This enumeration contains values defined in modules other than the Catalog module. */
export var PriceAdjustmentCodesEnum;
(function (PriceAdjustmentCodesEnum) {
    PriceAdjustmentCodesEnum["TAX"] = "TAX";
    PriceAdjustmentCodesEnum["WEEE"] = "WEEE";
    PriceAdjustmentCodesEnum["WEEE_TAX"] = "WEEE_TAX";
})(PriceAdjustmentCodesEnum || (PriceAdjustmentCodesEnum = {}));
/** PriceAdjustmentDescriptionEnum is deprecated. This enumeration states whether a price adjustment is included or excluded. */
export var PriceAdjustmentDescriptionEnum;
(function (PriceAdjustmentDescriptionEnum) {
    PriceAdjustmentDescriptionEnum["INCLUDED"] = "INCLUDED";
    PriceAdjustmentDescriptionEnum["EXCLUDED"] = "EXCLUDED";
})(PriceAdjustmentDescriptionEnum || (PriceAdjustmentDescriptionEnum = {}));
/** This enumeration states whether a product stock status is in stock or out of stock */
export var ProductStockStatus;
(function (ProductStockStatus) {
    ProductStockStatus["IN_STOCK"] = "IN_STOCK";
    ProductStockStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
})(ProductStockStatus || (ProductStockStatus = {}));
export var CheckoutAgreementMode;
(function (CheckoutAgreementMode) {
    CheckoutAgreementMode["AUTO"] = "AUTO";
    CheckoutAgreementMode["MANUAL"] = "MANUAL";
})(CheckoutAgreementMode || (CheckoutAgreementMode = {}));
/** The list of countries codes */
export var CountryCodeEnum;
(function (CountryCodeEnum) {
    /** Afghanistan */
    CountryCodeEnum["AF"] = "AF";
    /** Åland Islands */
    CountryCodeEnum["AX"] = "AX";
    /** Albania */
    CountryCodeEnum["AL"] = "AL";
    /** Algeria */
    CountryCodeEnum["DZ"] = "DZ";
    /** American Samoa */
    CountryCodeEnum["AS"] = "AS";
    /** Andorra */
    CountryCodeEnum["AD"] = "AD";
    /** Angola */
    CountryCodeEnum["AO"] = "AO";
    /** Anguilla */
    CountryCodeEnum["AI"] = "AI";
    /** Antarctica */
    CountryCodeEnum["AQ"] = "AQ";
    /** Antigua & Barbuda */
    CountryCodeEnum["AG"] = "AG";
    /** Argentina */
    CountryCodeEnum["AR"] = "AR";
    /** Armenia */
    CountryCodeEnum["AM"] = "AM";
    /** Aruba */
    CountryCodeEnum["AW"] = "AW";
    /** Australia */
    CountryCodeEnum["AU"] = "AU";
    /** Austria */
    CountryCodeEnum["AT"] = "AT";
    /** Azerbaijan */
    CountryCodeEnum["AZ"] = "AZ";
    /** Bahamas */
    CountryCodeEnum["BS"] = "BS";
    /** Bahrain */
    CountryCodeEnum["BH"] = "BH";
    /** Bangladesh */
    CountryCodeEnum["BD"] = "BD";
    /** Barbados */
    CountryCodeEnum["BB"] = "BB";
    /** Belarus */
    CountryCodeEnum["BY"] = "BY";
    /** Belgium */
    CountryCodeEnum["BE"] = "BE";
    /** Belize */
    CountryCodeEnum["BZ"] = "BZ";
    /** Benin */
    CountryCodeEnum["BJ"] = "BJ";
    /** Bermuda */
    CountryCodeEnum["BM"] = "BM";
    /** Bhutan */
    CountryCodeEnum["BT"] = "BT";
    /** Bolivia */
    CountryCodeEnum["BO"] = "BO";
    /** Bosnia & Herzegovina */
    CountryCodeEnum["BA"] = "BA";
    /** Botswana */
    CountryCodeEnum["BW"] = "BW";
    /** Bouvet Island */
    CountryCodeEnum["BV"] = "BV";
    /** Brazil */
    CountryCodeEnum["BR"] = "BR";
    /** British Indian Ocean Territory */
    CountryCodeEnum["IO"] = "IO";
    /** British Virgin Islands */
    CountryCodeEnum["VG"] = "VG";
    /** Brunei */
    CountryCodeEnum["BN"] = "BN";
    /** Bulgaria */
    CountryCodeEnum["BG"] = "BG";
    /** Burkina Faso */
    CountryCodeEnum["BF"] = "BF";
    /** Burundi */
    CountryCodeEnum["BI"] = "BI";
    /** Cambodia */
    CountryCodeEnum["KH"] = "KH";
    /** Cameroon */
    CountryCodeEnum["CM"] = "CM";
    /** Canada */
    CountryCodeEnum["CA"] = "CA";
    /** Cape Verde */
    CountryCodeEnum["CV"] = "CV";
    /** Cayman Islands */
    CountryCodeEnum["KY"] = "KY";
    /** Central African Republic */
    CountryCodeEnum["CF"] = "CF";
    /** Chad */
    CountryCodeEnum["TD"] = "TD";
    /** Chile */
    CountryCodeEnum["CL"] = "CL";
    /** China */
    CountryCodeEnum["CN"] = "CN";
    /** Christmas Island */
    CountryCodeEnum["CX"] = "CX";
    /** Cocos (Keeling) Islands */
    CountryCodeEnum["CC"] = "CC";
    /** Colombia */
    CountryCodeEnum["CO"] = "CO";
    /** Comoros */
    CountryCodeEnum["KM"] = "KM";
    /** Congo-Brazzaville */
    CountryCodeEnum["CG"] = "CG";
    /** Congo-Kinshasa */
    CountryCodeEnum["CD"] = "CD";
    /** Cook Islands */
    CountryCodeEnum["CK"] = "CK";
    /** Costa Rica */
    CountryCodeEnum["CR"] = "CR";
    /** Côte d’Ivoire */
    CountryCodeEnum["CI"] = "CI";
    /** Croatia */
    CountryCodeEnum["HR"] = "HR";
    /** Cuba */
    CountryCodeEnum["CU"] = "CU";
    /** Cyprus */
    CountryCodeEnum["CY"] = "CY";
    /** Czech Republic */
    CountryCodeEnum["CZ"] = "CZ";
    /** Denmark */
    CountryCodeEnum["DK"] = "DK";
    /** Djibouti */
    CountryCodeEnum["DJ"] = "DJ";
    /** Dominica */
    CountryCodeEnum["DM"] = "DM";
    /** Dominican Republic */
    CountryCodeEnum["DO"] = "DO";
    /** Ecuador */
    CountryCodeEnum["EC"] = "EC";
    /** Egypt */
    CountryCodeEnum["EG"] = "EG";
    /** El Salvador */
    CountryCodeEnum["SV"] = "SV";
    /** Equatorial Guinea */
    CountryCodeEnum["GQ"] = "GQ";
    /** Eritrea */
    CountryCodeEnum["ER"] = "ER";
    /** Estonia */
    CountryCodeEnum["EE"] = "EE";
    /** Ethiopia */
    CountryCodeEnum["ET"] = "ET";
    /** Falkland Islands */
    CountryCodeEnum["FK"] = "FK";
    /** Faroe Islands */
    CountryCodeEnum["FO"] = "FO";
    /** Fiji */
    CountryCodeEnum["FJ"] = "FJ";
    /** Finland */
    CountryCodeEnum["FI"] = "FI";
    /** France */
    CountryCodeEnum["FR"] = "FR";
    /** French Guiana */
    CountryCodeEnum["GF"] = "GF";
    /** French Polynesia */
    CountryCodeEnum["PF"] = "PF";
    /** French Southern Territories */
    CountryCodeEnum["TF"] = "TF";
    /** Gabon */
    CountryCodeEnum["GA"] = "GA";
    /** Gambia */
    CountryCodeEnum["GM"] = "GM";
    /** Georgia */
    CountryCodeEnum["GE"] = "GE";
    /** Germany */
    CountryCodeEnum["DE"] = "DE";
    /** Ghana */
    CountryCodeEnum["GH"] = "GH";
    /** Gibraltar */
    CountryCodeEnum["GI"] = "GI";
    /** Greece */
    CountryCodeEnum["GR"] = "GR";
    /** Greenland */
    CountryCodeEnum["GL"] = "GL";
    /** Grenada */
    CountryCodeEnum["GD"] = "GD";
    /** Guadeloupe */
    CountryCodeEnum["GP"] = "GP";
    /** Guam */
    CountryCodeEnum["GU"] = "GU";
    /** Guatemala */
    CountryCodeEnum["GT"] = "GT";
    /** Guernsey */
    CountryCodeEnum["GG"] = "GG";
    /** Guinea */
    CountryCodeEnum["GN"] = "GN";
    /** Guinea-Bissau */
    CountryCodeEnum["GW"] = "GW";
    /** Guyana */
    CountryCodeEnum["GY"] = "GY";
    /** Haiti */
    CountryCodeEnum["HT"] = "HT";
    /** Heard &amp; McDonald Islands */
    CountryCodeEnum["HM"] = "HM";
    /** Honduras */
    CountryCodeEnum["HN"] = "HN";
    /** Hong Kong SAR China */
    CountryCodeEnum["HK"] = "HK";
    /** Hungary */
    CountryCodeEnum["HU"] = "HU";
    /** Iceland */
    CountryCodeEnum["IS"] = "IS";
    /** India */
    CountryCodeEnum["IN"] = "IN";
    /** Indonesia */
    CountryCodeEnum["ID"] = "ID";
    /** Iran */
    CountryCodeEnum["IR"] = "IR";
    /** Iraq */
    CountryCodeEnum["IQ"] = "IQ";
    /** Ireland */
    CountryCodeEnum["IE"] = "IE";
    /** Isle of Man */
    CountryCodeEnum["IM"] = "IM";
    /** Israel */
    CountryCodeEnum["IL"] = "IL";
    /** Italy */
    CountryCodeEnum["IT"] = "IT";
    /** Jamaica */
    CountryCodeEnum["JM"] = "JM";
    /** Japan */
    CountryCodeEnum["JP"] = "JP";
    /** Jersey */
    CountryCodeEnum["JE"] = "JE";
    /** Jordan */
    CountryCodeEnum["JO"] = "JO";
    /** Kazakhstan */
    CountryCodeEnum["KZ"] = "KZ";
    /** Kenya */
    CountryCodeEnum["KE"] = "KE";
    /** Kiribati */
    CountryCodeEnum["KI"] = "KI";
    /** Kuwait */
    CountryCodeEnum["KW"] = "KW";
    /** Kyrgyzstan */
    CountryCodeEnum["KG"] = "KG";
    /** Laos */
    CountryCodeEnum["LA"] = "LA";
    /** Latvia */
    CountryCodeEnum["LV"] = "LV";
    /** Lebanon */
    CountryCodeEnum["LB"] = "LB";
    /** Lesotho */
    CountryCodeEnum["LS"] = "LS";
    /** Liberia */
    CountryCodeEnum["LR"] = "LR";
    /** Libya */
    CountryCodeEnum["LY"] = "LY";
    /** Liechtenstein */
    CountryCodeEnum["LI"] = "LI";
    /** Lithuania */
    CountryCodeEnum["LT"] = "LT";
    /** Luxembourg */
    CountryCodeEnum["LU"] = "LU";
    /** Macau SAR China */
    CountryCodeEnum["MO"] = "MO";
    /** Macedonia */
    CountryCodeEnum["MK"] = "MK";
    /** Madagascar */
    CountryCodeEnum["MG"] = "MG";
    /** Malawi */
    CountryCodeEnum["MW"] = "MW";
    /** Malaysia */
    CountryCodeEnum["MY"] = "MY";
    /** Maldives */
    CountryCodeEnum["MV"] = "MV";
    /** Mali */
    CountryCodeEnum["ML"] = "ML";
    /** Malta */
    CountryCodeEnum["MT"] = "MT";
    /** Marshall Islands */
    CountryCodeEnum["MH"] = "MH";
    /** Martinique */
    CountryCodeEnum["MQ"] = "MQ";
    /** Mauritania */
    CountryCodeEnum["MR"] = "MR";
    /** Mauritius */
    CountryCodeEnum["MU"] = "MU";
    /** Mayotte */
    CountryCodeEnum["YT"] = "YT";
    /** Mexico */
    CountryCodeEnum["MX"] = "MX";
    /** Micronesia */
    CountryCodeEnum["FM"] = "FM";
    /** Moldova */
    CountryCodeEnum["MD"] = "MD";
    /** Monaco */
    CountryCodeEnum["MC"] = "MC";
    /** Mongolia */
    CountryCodeEnum["MN"] = "MN";
    /** Montenegro */
    CountryCodeEnum["ME"] = "ME";
    /** Montserrat */
    CountryCodeEnum["MS"] = "MS";
    /** Morocco */
    CountryCodeEnum["MA"] = "MA";
    /** Mozambique */
    CountryCodeEnum["MZ"] = "MZ";
    /** Myanmar (Burma) */
    CountryCodeEnum["MM"] = "MM";
    /** Namibia */
    CountryCodeEnum["NA"] = "NA";
    /** Nauru */
    CountryCodeEnum["NR"] = "NR";
    /** Nepal */
    CountryCodeEnum["NP"] = "NP";
    /** Netherlands */
    CountryCodeEnum["NL"] = "NL";
    /** Netherlands Antilles */
    CountryCodeEnum["AN"] = "AN";
    /** New Caledonia */
    CountryCodeEnum["NC"] = "NC";
    /** New Zealand */
    CountryCodeEnum["NZ"] = "NZ";
    /** Nicaragua */
    CountryCodeEnum["NI"] = "NI";
    /** Niger */
    CountryCodeEnum["NE"] = "NE";
    /** Nigeria */
    CountryCodeEnum["NG"] = "NG";
    /** Niue */
    CountryCodeEnum["NU"] = "NU";
    /** Norfolk Island */
    CountryCodeEnum["NF"] = "NF";
    /** Northern Mariana Islands */
    CountryCodeEnum["MP"] = "MP";
    /** North Korea */
    CountryCodeEnum["KP"] = "KP";
    /** Norway */
    CountryCodeEnum["NO"] = "NO";
    /** Oman */
    CountryCodeEnum["OM"] = "OM";
    /** Pakistan */
    CountryCodeEnum["PK"] = "PK";
    /** Palau */
    CountryCodeEnum["PW"] = "PW";
    /** Palestinian Territories */
    CountryCodeEnum["PS"] = "PS";
    /** Panama */
    CountryCodeEnum["PA"] = "PA";
    /** Papua New Guinea */
    CountryCodeEnum["PG"] = "PG";
    /** Paraguay */
    CountryCodeEnum["PY"] = "PY";
    /** Peru */
    CountryCodeEnum["PE"] = "PE";
    /** Philippines */
    CountryCodeEnum["PH"] = "PH";
    /** Pitcairn Islands */
    CountryCodeEnum["PN"] = "PN";
    /** Poland */
    CountryCodeEnum["PL"] = "PL";
    /** Portugal */
    CountryCodeEnum["PT"] = "PT";
    /** Qatar */
    CountryCodeEnum["QA"] = "QA";
    /** Réunion */
    CountryCodeEnum["RE"] = "RE";
    /** Romania */
    CountryCodeEnum["RO"] = "RO";
    /** Russia */
    CountryCodeEnum["RU"] = "RU";
    /** Rwanda */
    CountryCodeEnum["RW"] = "RW";
    /** Samoa */
    CountryCodeEnum["WS"] = "WS";
    /** San Marino */
    CountryCodeEnum["SM"] = "SM";
    /** São Tomé & Príncipe */
    CountryCodeEnum["ST"] = "ST";
    /** Saudi Arabia */
    CountryCodeEnum["SA"] = "SA";
    /** Senegal */
    CountryCodeEnum["SN"] = "SN";
    /** Serbia */
    CountryCodeEnum["RS"] = "RS";
    /** Seychelles */
    CountryCodeEnum["SC"] = "SC";
    /** Sierra Leone */
    CountryCodeEnum["SL"] = "SL";
    /** Singapore */
    CountryCodeEnum["SG"] = "SG";
    /** Slovakia */
    CountryCodeEnum["SK"] = "SK";
    /** Slovenia */
    CountryCodeEnum["SI"] = "SI";
    /** Solomon Islands */
    CountryCodeEnum["SB"] = "SB";
    /** Somalia */
    CountryCodeEnum["SO"] = "SO";
    /** South Africa */
    CountryCodeEnum["ZA"] = "ZA";
    /** South Georgia & South Sandwich Islands */
    CountryCodeEnum["GS"] = "GS";
    /** South Korea */
    CountryCodeEnum["KR"] = "KR";
    /** Spain */
    CountryCodeEnum["ES"] = "ES";
    /** Sri Lanka */
    CountryCodeEnum["LK"] = "LK";
    /** St. Barthélemy */
    CountryCodeEnum["BL"] = "BL";
    /** St. Helena */
    CountryCodeEnum["SH"] = "SH";
    /** St. Kitts & Nevis */
    CountryCodeEnum["KN"] = "KN";
    /** St. Lucia */
    CountryCodeEnum["LC"] = "LC";
    /** St. Martin */
    CountryCodeEnum["MF"] = "MF";
    /** St. Pierre & Miquelon */
    CountryCodeEnum["PM"] = "PM";
    /** St. Vincent & Grenadines */
    CountryCodeEnum["VC"] = "VC";
    /** Sudan */
    CountryCodeEnum["SD"] = "SD";
    /** Suriname */
    CountryCodeEnum["SR"] = "SR";
    /** Svalbard & Jan Mayen */
    CountryCodeEnum["SJ"] = "SJ";
    /** Swaziland */
    CountryCodeEnum["SZ"] = "SZ";
    /** Sweden */
    CountryCodeEnum["SE"] = "SE";
    /** Switzerland */
    CountryCodeEnum["CH"] = "CH";
    /** Syria */
    CountryCodeEnum["SY"] = "SY";
    /** Taiwan */
    CountryCodeEnum["TW"] = "TW";
    /** Tajikistan */
    CountryCodeEnum["TJ"] = "TJ";
    /** Tanzania */
    CountryCodeEnum["TZ"] = "TZ";
    /** Thailand */
    CountryCodeEnum["TH"] = "TH";
    /** Timor-Leste */
    CountryCodeEnum["TL"] = "TL";
    /** Togo */
    CountryCodeEnum["TG"] = "TG";
    /** Tokelau */
    CountryCodeEnum["TK"] = "TK";
    /** Tonga */
    CountryCodeEnum["TO"] = "TO";
    /** Trinidad & Tobago */
    CountryCodeEnum["TT"] = "TT";
    /** Tunisia */
    CountryCodeEnum["TN"] = "TN";
    /** Turkey */
    CountryCodeEnum["TR"] = "TR";
    /** Turkmenistan */
    CountryCodeEnum["TM"] = "TM";
    /** Turks & Caicos Islands */
    CountryCodeEnum["TC"] = "TC";
    /** Tuvalu */
    CountryCodeEnum["TV"] = "TV";
    /** Uganda */
    CountryCodeEnum["UG"] = "UG";
    /** Ukraine */
    CountryCodeEnum["UA"] = "UA";
    /** United Arab Emirates */
    CountryCodeEnum["AE"] = "AE";
    /** United Kingdom */
    CountryCodeEnum["GB"] = "GB";
    /** United States */
    CountryCodeEnum["US"] = "US";
    /** Uruguay */
    CountryCodeEnum["UY"] = "UY";
    /** U.S. Outlying Islands */
    CountryCodeEnum["UM"] = "UM";
    /** U.S. Virgin Islands */
    CountryCodeEnum["VI"] = "VI";
    /** Uzbekistan */
    CountryCodeEnum["UZ"] = "UZ";
    /** Vanuatu */
    CountryCodeEnum["VU"] = "VU";
    /** Vatican City */
    CountryCodeEnum["VA"] = "VA";
    /** Venezuela */
    CountryCodeEnum["VE"] = "VE";
    /** Vietnam */
    CountryCodeEnum["VN"] = "VN";
    /** Wallis & Futuna */
    CountryCodeEnum["WF"] = "WF";
    /** Western Sahara */
    CountryCodeEnum["EH"] = "EH";
    /** Yemen */
    CountryCodeEnum["YE"] = "YE";
    /** Zambia */
    CountryCodeEnum["ZM"] = "ZM";
    /** Zimbabwe */
    CountryCodeEnum["ZW"] = "ZW";
})(CountryCodeEnum || (CountryCodeEnum = {}));
/** This enumeration the price type. */
export var PriceTypeEnum;
(function (PriceTypeEnum) {
    PriceTypeEnum["FIXED"] = "FIXED";
    PriceTypeEnum["PERCENT"] = "PERCENT";
    PriceTypeEnum["DYNAMIC"] = "DYNAMIC";
})(PriceTypeEnum || (PriceTypeEnum = {}));
/** The list of available payment token types */
export var PaymentTokenTypeEnum;
(function (PaymentTokenTypeEnum) {
    PaymentTokenTypeEnum["card"] = "card";
    PaymentTokenTypeEnum["account"] = "account";
})(PaymentTokenTypeEnum || (PaymentTokenTypeEnum = {}));
/** Mode for payment: TEST or LIVE. Applies to Payflow Link and Payments Advanced payment methods. */
export var PayflowLinkMode;
(function (PayflowLinkMode) {
    PayflowLinkMode["TEST"] = "TEST";
    PayflowLinkMode["LIVE"] = "LIVE";
})(PayflowLinkMode || (PayflowLinkMode = {}));
/** This enumeration defines the entity type. */
export var UrlRewriteEntityTypeEnum;
(function (UrlRewriteEntityTypeEnum) {
    UrlRewriteEntityTypeEnum["CMS_PAGE"] = "CMS_PAGE";
    UrlRewriteEntityTypeEnum["PRODUCT"] = "PRODUCT";
    UrlRewriteEntityTypeEnum["CATEGORY"] = "CATEGORY";
})(UrlRewriteEntityTypeEnum || (UrlRewriteEntityTypeEnum = {}));
export var CartUserInputErrorType;
(function (CartUserInputErrorType) {
    CartUserInputErrorType["PRODUCT_NOT_FOUND"] = "PRODUCT_NOT_FOUND";
    CartUserInputErrorType["NOT_SALABLE"] = "NOT_SALABLE";
    CartUserInputErrorType["INSUFFICIENT_STOCK"] = "INSUFFICIENT_STOCK";
    CartUserInputErrorType["UNDEFINED"] = "UNDEFINED";
})(CartUserInputErrorType || (CartUserInputErrorType = {}));
export var WishListUserInputErrorType;
(function (WishListUserInputErrorType) {
    WishListUserInputErrorType["PRODUCT_NOT_FOUND"] = "PRODUCT_NOT_FOUND";
    WishListUserInputErrorType["UNDEFINED"] = "UNDEFINED";
})(WishListUserInputErrorType || (WishListUserInputErrorType = {}));
export var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["CREATED"] = "CREATED";
    PaymentStatusEnum["PAID"] = "PAID";
    PaymentStatusEnum["AUTHORIZED"] = "AUTHORIZED";
    PaymentStatusEnum["CANCELED"] = "CANCELED";
    PaymentStatusEnum["SHIPPING"] = "SHIPPING";
    PaymentStatusEnum["COMPLETED"] = "COMPLETED";
    PaymentStatusEnum["EXPIRED"] = "EXPIRED";
    PaymentStatusEnum["PENDING"] = "PENDING";
    PaymentStatusEnum["REFUNDED"] = "REFUNDED";
    PaymentStatusEnum["ERROR"] = "ERROR";
})(PaymentStatusEnum || (PaymentStatusEnum = {}));
export var CheckoutUserInputErrorCodes;
(function (CheckoutUserInputErrorCodes) {
    CheckoutUserInputErrorCodes["REORDER_NOT_AVAILABLE"] = "REORDER_NOT_AVAILABLE";
    CheckoutUserInputErrorCodes["PRODUCT_NOT_FOUND"] = "PRODUCT_NOT_FOUND";
    CheckoutUserInputErrorCodes["NOT_SALABLE"] = "NOT_SALABLE";
    CheckoutUserInputErrorCodes["INSUFFICIENT_STOCK"] = "INSUFFICIENT_STOCK";
    CheckoutUserInputErrorCodes["UNDEFINED"] = "UNDEFINED";
})(CheckoutUserInputErrorCodes || (CheckoutUserInputErrorCodes = {}));
export var SubscriptionStatusesEnum;
(function (SubscriptionStatusesEnum) {
    SubscriptionStatusesEnum["NOT_ACTIVE"] = "NOT_ACTIVE";
    SubscriptionStatusesEnum["SUBSCRIBED"] = "SUBSCRIBED";
    SubscriptionStatusesEnum["UNSUBSCRIBED"] = "UNSUBSCRIBED";
    SubscriptionStatusesEnum["UNCONFIRMED"] = "UNCONFIRMED";
})(SubscriptionStatusesEnum || (SubscriptionStatusesEnum = {}));
export var DownloadableFileTypeEnum;
(function (DownloadableFileTypeEnum) {
    DownloadableFileTypeEnum["FILE"] = "FILE";
    DownloadableFileTypeEnum["URL"] = "URL";
})(DownloadableFileTypeEnum || (DownloadableFileTypeEnum = {}));
/** This enumeration defines whether a bundle product's price is displayed as the lowest possible value or as a range. */
export var PriceViewEnum;
(function (PriceViewEnum) {
    PriceViewEnum["PRICE_RANGE"] = "PRICE_RANGE";
    PriceViewEnum["AS_LOW_AS"] = "AS_LOW_AS";
})(PriceViewEnum || (PriceViewEnum = {}));
/** This enumeration defines whether bundle items must be shipped together. */
export var ShipBundleItemsEnum;
(function (ShipBundleItemsEnum) {
    ShipBundleItemsEnum["TOGETHER"] = "TOGETHER";
    ShipBundleItemsEnum["SEPARATELY"] = "SEPARATELY";
})(ShipBundleItemsEnum || (ShipBundleItemsEnum = {}));
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { cwd } from 'process';
import { join, relative, isAbsolute } from 'path';
import ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_1 from '@graphql-mesh/graphql';
import ExternalModule_2 from '@graphql-mesh/merger-stitching';
import ExternalModule_3 from '@graphql-mesh/transform-filter-schema';
import ExternalModule_4 from './sources/graphcms/schema.graphql.js';
import ExternalModule_5 from './sources/m2/schema.graphql.js';
const importedModules = {
    // @ts-ignore
    [`@graphql-mesh/cache-inmemory-lru`]: ExternalModule_0,
    // @ts-ignore
    [`@graphql-mesh/graphql`]: ExternalModule_1,
    // @ts-ignore
    [`@graphql-mesh/merger-stitching`]: ExternalModule_2,
    // @ts-ignore
    [`@graphql-mesh/transform-filter-schema`]: ExternalModule_3,
    // @ts-ignore
    [`.mesh/sources/graphcms/schema.graphql.js`]: ExternalModule_4,
    // @ts-ignore
    [`.mesh/sources/m2/schema.graphql.js`]: ExternalModule_5
};
const baseDir = join(cwd(), '');
const syncImportFn = (moduleId) => {
    const relativeModuleId = isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId;
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql';
import StitchingMerger from '@graphql-mesh/merger-stitching';
import FilterSchemaTransform from '@graphql-mesh/transform-filter-schema';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
export const rawConfig = { "$schema": "../../node_modules/@graphql-mesh/types/config-schema.json", "sources": [{ "name": "graphcms", "handler": { "graphql": { "endpoint": "https://api-eu-central-1.graphcms.com/v2/ckhx7xadya6xs01yxdujt8i80/master", "operationHeaders": { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MDYyOTgyMTYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NraHg3eGFkeWE2eHMwMXl4ZHVqdDhpODAvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNmEyZDg5ZWEtM2Y1YS00NGFmLTk5YTMtNjljYWUwYWU1MDYxIiwianRpIjoiY2toeDhoZnk5YWpnZDAxeXg0b3NiMHdqMSJ9.AnGIdDfobybMBDAP7tLEVfVlI_KQJSAP_Z10susXYSpKTYyabbbDnmismYrfLINKk08nKIvPLlNzJxmfj5hYK_SOpok47zhgQdNbQJpzkUiVWmNnX0ck3NXMBNmWxCCoqHlD3JD5ikVoA4YB2fQOc476zS3Z2VoipZQv5e8q936Ii0bmrWMtCyhReMA0GjFMKeRdkIpi-iG_HbPyOCUNqJ3EXi1tnvUbP_h2pshTV8bS0_FndYO_lHDIHOhEO5fR1TsMTzTCbSJQvf2fAME-oAwUBGq_2-_Ek6PCYiJrK_TksKDFG2A9HBNFrog0NB5lX6YLKsvw8um82cb4HnvLv7bbOmw5bOMkb0PFsnHjqnYVSVNoakoSmvhEXhrm06LtRPtpSBCz6VVGsMgg0rh28kwnZWWmxLaeWZT_hn6fuP6hsftfybvnWFjgpVH2x0vTq2Gnv8U9n4MzZ8APmhh4SjPRM5KxPPNpbaO94XnfI0GafRORgv7Xs8Ws_x7WiODyU-_F8Oo9e8MqmPyRBr3gBjSR0a8TieVKDoDhxa6Mf6um6IcaldL1fwk7Xsj3Uq5qaJzekPBsWc-KEJLo48CZqVIH22xL_KobRnLWqHtXU0v4C_eClQ095rAJsGPie1zzuEZtF2DjlFyzwWD_mDZxH2BepwoGpSI5Vyccn_JQgxk" }, "schemaHeaders": { "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MDYyOTgyMTYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NraHg3eGFkeWE2eHMwMXl4ZHVqdDhpODAvbWFzdGVyIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNmEyZDg5ZWEtM2Y1YS00NGFmLTk5YTMtNjljYWUwYWU1MDYxIiwianRpIjoiY2toeDhoZnk5YWpnZDAxeXg0b3NiMHdqMSJ9.AnGIdDfobybMBDAP7tLEVfVlI_KQJSAP_Z10susXYSpKTYyabbbDnmismYrfLINKk08nKIvPLlNzJxmfj5hYK_SOpok47zhgQdNbQJpzkUiVWmNnX0ck3NXMBNmWxCCoqHlD3JD5ikVoA4YB2fQOc476zS3Z2VoipZQv5e8q936Ii0bmrWMtCyhReMA0GjFMKeRdkIpi-iG_HbPyOCUNqJ3EXi1tnvUbP_h2pshTV8bS0_FndYO_lHDIHOhEO5fR1TsMTzTCbSJQvf2fAME-oAwUBGq_2-_Ek6PCYiJrK_TksKDFG2A9HBNFrog0NB5lX6YLKsvw8um82cb4HnvLv7bbOmw5bOMkb0PFsnHjqnYVSVNoakoSmvhEXhrm06LtRPtpSBCz6VVGsMgg0rh28kwnZWWmxLaeWZT_hn6fuP6hsftfybvnWFjgpVH2x0vTq2Gnv8U9n4MzZ8APmhh4SjPRM5KxPPNpbaO94XnfI0GafRORgv7Xs8Ws_x7WiODyU-_F8Oo9e8MqmPyRBr3gBjSR0a8TieVKDoDhxa6Mf6um6IcaldL1fwk7Xsj3Uq5qaJzekPBsWc-KEJLo48CZqVIH22xL_KobRnLWqHtXU0v4C_eClQ095rAJsGPie1zzuEZtF2DjlFyzwWD_mDZxH2BepwoGpSI5Vyccn_JQgxk" } } }, "transforms": [{ "filterSchema": ["Query.{pages,footer,usps,productpages,pagesConnection}", "Mutation.none"] }] }, { "name": "m2", "handler": { "graphql": { "endpoint": "https://backend.reachdigital.dev/graphql", "schemaHeaders": { "Store": "{context.req.headers.store}", "Authorization": "{context.req.headers.authorization}" }, "operationHeaders": { "Store": "{context.req.headers.store}", "Authorization": "{context.req.headers.authorization}" } } } }] };
export function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('Mesh');
    const sources = [];
    const transforms = [];
    const graphcmsTransforms = [];
    const m2Transforms = [];
    const additionalTypeDefs = [];
    const graphcmsHandler = new GraphqlHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    const m2Handler = new GraphqlHandler({
        name: rawConfig.sources[1].name,
        config: rawConfig.sources[1].handler.graphql,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[1].name),
        logger: logger.child(rawConfig.sources[1].name),
        importFn
    });
    sources.push({
        name: 'm2',
        handler: m2Handler,
        transforms: m2Transforms
    });
    const merger = new StitchingMerger({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    graphcmsTransforms.push(new FilterSchemaTransform({
        apiName: rawConfig.sources[0].name,
        config: rawConfig.sources[0].transforms[0].filterSchema,
        baseDir,
        cache,
        pubsub,
        syncImportFn
    }));
    sources.push({
        name: 'graphcms',
        handler: graphcmsHandler,
        transforms: graphcmsTransforms
    });
    const additionalResolvers = resolveAdditionalResolvers(baseDir, rawConfig.additionalResolvers, syncImportFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
export const documentsInSDL = /*#__PURE__*/ [];
export function getBuiltMesh() {
    const meshConfig = getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export function getSdk(requester) {
    return {};
}
