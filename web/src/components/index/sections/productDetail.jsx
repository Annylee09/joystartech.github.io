import Image from 'next/image';
import Link from 'next/link';
import ProductTabs from '@/components/index/sections/productTabs';
import ProductCover from "@/components/index/sections/productCover";
import lang from "@/locales";
import React from "react";

export default function ProductDetail({detailData, relatedData}) {
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* 面包屑导航 */}
            <div className="mb-8 text-sm">
                <nav className="text-gray-500">
                    <Link href="/" className="hover:text-mainColorNormal">{lang.Home}</Link>
                    <span className="mx-2">/</span>
                    <Link href="/product" className="hover:text-mainColorNormal">{lang.Product}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{detailData.title}</span>
                </nav>
            </div>

            {/* 商品详情主体 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* 左侧商品图片 - 使用轮播组件 */}
                <div className="aspect-[4/3]">
                    <ProductCover product={detailData}/>
                </div>

                {/* 右侧商品信息 */}
                <div>
                    {/* 商品名称 */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {detailData.title}
                    </h1>

                    {/* 商品价格 */}
                    {detailData.price && detailData.price.length > 0 && (
                        <div className="text-2xl font-bold text-gray-900 mt-4 mb-1.5">
                            {detailData.price}
                        </div>
                    )}

                    {/* 商品摘要 */}
                    <div className="text-gray-700 mb-8">
                        <p>{detailData.summary}</p>
                    </div>

                    {/* 获取免费报价按钮 */}
                    <div className="mb-8">
                        <Link
                            href="/contact"
                            className="bg-mainColorNormal hover:bg-mainColorDeep text-white py-3 px-6 transition-colors w-full text-center font-medium"
                        >
                            {lang.GetAFreeQuote}
                        </Link>
                    </div>

                    {/* 商品分类 */}
                    <div className="text-sm text-gray-600">
                        <span>{lang.Category}: </span>
                        <Link href={`/product/category/${detailData.category}`}
                              className="text-mainColorNormal">
                            {detailData.category_title}
                        </Link>
                    </div>
                </div>
            </div>

            {/* 产品选项卡 */}
            <ProductTabs product={detailData}/>

            {/* 产品推荐 */}
            {relatedData.length > 0 && (
                <div className="mt-24">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                            {lang.RelatedProducts}
                        </h2>
                    </div>
                    <div className="w-full h-[1px] bg-[#eee] mb-10">
                        <div className="h-[1px] w-[100px] bg-mainColorNormal"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedData.map((relatedProduct) => {
                            // 提取第一张图片
                            const cover = relatedProduct.cover ? relatedProduct.cover.split('#')[0] : '';
                            return (
                                <div key={relatedProduct.id} className="group">
                                    <div className="relative mb-6 overflow-hidden bg-gray-100">
                                        <Link href={`/product/${relatedProduct.id}`}>
                                            <div className="relative w-full pt-[100%]">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/upload/img/${cover}`}
                                                    alt={relatedProduct.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                                                />
                                            </div>
                                        </Link>
                                    </div>

                                    <Link href={`/product/${relatedProduct.id}`}>
                                        <h3 className="text-gray-800 font-semibold text-lg mb-2">{relatedProduct.title}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-2">{relatedProduct.category_title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}