import React, { useState, useMemo, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Icon from '../../../components/common/Icon';
import Fields from '../../../components/forms/Fields';
import Button from '../../../components/common/Button';
import Tab from '../../../components/common/Tab';
import Table from '../../../components/common/Table';
import Modal from '../../../components/common/Modal';
import Pagination from '../../../components/common/Pagination';
import CardLayout from '../../../components/layout/sections/CardLayout';
import { productsData, supplierData } from '../../../utils/apiData';
import { getStickyTop, navigateToProduct, navigateToCategory } from '../../../utils/utils';

const SupplierSidebarContent = memo(({ supplierInfo, labels, statsConfig, trustPoints, contactItemsConfig, onConnectClick }) => {
    const contactItems = useMemo(() => {
        return (contactItemsConfig || [])
            .map((item) => {
                const val = supplierInfo[item.key];
                if (!val) return null;
                const displayVal = item.displayKey ? (supplierInfo[item.displayKey] || val) : val;
                const isPhone = item.linkPrefix === 'tel:';
                const content = item.type === 'link' ? (
                    <a href={`${item.linkPrefix || ''}${val}`} className={`${isPhone ? 'text-primary font-600' : 'text-gray font-500'} mini-text`}>
                        {item.label ? `${item.label} ` : ''}{displayVal}
                    </a>
                ) : (
                    <p className="text-gray mini-text font-500">
                        {item.label} {displayVal}{item.extraKey && supplierInfo[item.extraKey] ? ` (${supplierInfo[item.extraKey]})` : ''}
                    </p>
                );

                return { id: item.id, icon: item.icon, color: item.color || 'var(--gray)', content };
            })
            .filter(Boolean);
    }, [supplierInfo, contactItemsConfig]);

    return (
        <div className="pb-50 sm-pb-5">
            <div className="bg-white border-ec p-16 rounded-5">
                <div className="flex items-center gap-12 bordb pb-16">
                    <div className="bg-light-primary rounded-full icon-lg flex items-center justify-center flex-shrink-0">
                        <p className="font-600 text-primary para-text">{supplierInfo.name?.charAt(0) || 'S'}</p>
                    </div>
                    <div>
                        <h3 className="text-dark headmini-text font-600">{supplierInfo.name}</h3>
                        <div className="flex items-center gap-4 text-success font-500 mini-text mt-2">
                            <Icon name="ShieldCheck" width="13" height="13" stroke="var(--success)" />
                            <span>{labels.trustSeal}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-12 bg-forth p-10 rounded-8">
                    <div className="flex items-center gap-6">
                        <span className="font-600 text-dark small-text">{supplierInfo.rating}</span>
                        <Fields type="rating" value={Math.round(supplierInfo.rating || 4)} size={13} gap={2} disabled />
                    </div>
                    <span className="text-gray mini-text font-500">({supplierInfo.reviews} {labels.ratings})</span>
                </div>

                <div className="grid-cols-2 gap-8 mt-12">
                    {statsConfig.map(({ key, label, textClass }) => (
                        <div key={key} className="bg-forth p-10 rounded-8 text-center">
                            <p className="mini-text text-gray">{label}</p>
                            <p className={`small-text font-600 ${textClass} mt-2`}>{supplierInfo[key]}</p>
                        </div>
                    ))}
                </div>

                <div className="grid-cols-1 gap-10 mt-16 bordt pt-16">
                    {contactItems.map(({ id, icon, color, content }) => (
                        <div key={id} className="flex items-center gap-8">
                            <Icon name={icon} width="14" height="14" stroke={color} />
                            {content}
                        </div>
                    ))}
                </div>

                <Button text={labels.b2bQuoteBtn} variant="primary" onClick={onConnectClick} version="v3" className="w-full mt-16" />
            </div>

            <div className="bg-white border-ec p-16 rounded-5 mt-14">
                <h4 className="headmini-text font-600 text-dark pb-8 bordb">{labels.trustAssuranceTitle}</h4>
                <div className="flex flex-column gap-10 mt-12">
                    {trustPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-8 mini-text text-gray font-500">
                            <Icon name="Check" width="14" height="14" stroke="var(--success)" className="flex-shrink-0 mt-2" />
                            <span className="leading-tight">{point}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
SupplierSidebarContent.displayName = 'SupplierSidebarContent';

const DetailSection = ({ supplierName }) => {
    const { brandName } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('catalog');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
    const ITEMS_PER_PAGE = 12;

    const brandKey = (brandName || 'supplier').toLowerCase().replace(/[^a-z0-9]/g, '');

    const labels = useMemo(() => supplierData?.labels || {}, []);
    const statsConfig = useMemo(() => supplierData?.stats || [], []);
    const contactItemsConfig = useMemo(() => supplierData?.contactItems || [], []);
    const specColumns = useMemo(() => supplierData?.specColumns || [], []);
    const factsheetFields = useMemo(() => supplierData?.factsheetFields || {}, []);
    const highlights = useMemo(() => supplierData?.highlights || [], []);

    const stickyTop = useMemo(() => getStickyTop(), []);

    const supplierInfo = useMemo(() => {
        const raw = supplierData || {};
        const env = import.meta.env;
        const displayName = supplierName || raw.name || (brandName ? brandName.charAt(0).toUpperCase() + brandName.slice(1) : raw.name);

        return {
            ...raw,
            name: displayName,
            gstin: env.VITE_GST || raw.gstin || '',
            phone: env.VITE_PHONE || raw.phone || '',
            phoneFormatted: env.VITE_PHONE ? `+91 ${env.VITE_PHONE}` : (raw.phoneFormatted || raw.phone || ''),
            email: env.VITE_EMAIL || raw.email || '',
            location: env.VITE_ADDRESS || raw.location || '',
            fullAddress: raw.fullAddress || (env.VITE_ADDRESS ? `${env.VITE_ADDRESS}, India` : raw.location || ''),
            rating: raw.rating || 4.3,
            reviews: raw.reviews || 72,
            established: raw.established || '',
            experience: raw.experience || '',
            legalStatus: raw.legalStatus || '',
            natureOfBusiness: raw.natureOfBusiness || '',
            moq: raw.moq || '',
            responseRate: raw.responseRate || '',
            responseTime: raw.responseTime || '',
            trustBadge: raw.trustBadge || '',
            category: raw.category || '',
            about: raw.about || ''
        };
    }, [brandName, supplierName]);

    const trustPoints = useMemo(() => [
        `GST Registered: ${supplierInfo.gstin} (Input Tax Credit)`,
        ...(supplierData?.trustPoints || [])
    ], [supplierInfo.gstin]);

    const validProducts = useMemo(() => {
        const real = (productsData || []).filter((p) => !p.isBanner);
        if (!brandName) return real;
        const key = brandKey.toLowerCase();
        const filtered = real.filter((p) => (p.vendor || '').toLowerCase().includes(key) || (p.brand || '').toLowerCase().includes(key));
        return filtered.length > 0 ? filtered : real;
    }, [brandKey, brandName]);

    const displayedProducts = useMemo(() => {
        if (!searchQuery.trim()) return validProducts;
        const q = searchQuery.toLowerCase();
        return validProducts.filter((p) =>
            (p.name || '').toLowerCase().includes(q) ||
            (p.category || '').toLowerCase().includes(q) ||
            (p.subCategory || '').toLowerCase().includes(q)
        );
    }, [validProducts, searchQuery]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return displayedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [displayedProducts, currentPage, ITEMS_PER_PAGE]);

    const specData = useMemo(() => [
        { id: 1, field: factsheetFields.companyName, value: supplierInfo.name },
        { id: 2, field: factsheetFields.natureOfBusiness, value: supplierInfo.natureOfBusiness },
        { id: 3, field: factsheetFields.legalStatus, value: supplierInfo.legalStatus },
        { id: 4, field: factsheetFields.yearOfEstablishment, value: `${supplierInfo.established} (${supplierInfo.experience})` },
        { id: 5, field: factsheetFields.gstinRegistration, value: `${supplierInfo.gstin} (${labels.verifiedActive})` },
        { id: 6, field: factsheetFields.registeredAddress, value: supplierInfo.fullAddress },
        { id: 7, field: factsheetFields.primaryHelpline, value: `${supplierInfo.phoneFormatted || supplierInfo.phone} (${supplierInfo.responseRate} ${labels.responseRateSuffix})` },
        { id: 8, field: factsheetFields.verificationTrust, value: supplierInfo.trustBadge },
        { id: 9, field: factsheetFields.productCategoryFocus, value: supplierInfo.category },
        { id: 10, field: factsheetFields.moq, value: supplierInfo.moq },
        { id: 11, field: factsheetFields.dispatchedHub, value: `${supplierInfo.location} ${labels.dispatchHubSuffix}` }
    ], [supplierInfo, factsheetFields, labels]);

    const tabs = useMemo(() => [
        { value: 'catalog', name: labels.catalogTab, count: displayedProducts.length },
        { value: 'profile', name: labels.profileTab }
    ], [displayedProducts.length, labels]);

    const handleConnectClick = useCallback(() => navigate('/connect'), [navigate]);
    const handleCloseMobileModal = useCallback(() => setIsMobileModalOpen(false), []);

    return (
        <div className="w-full">
            <div className="hidden sm-flex sm-mt-20">
                <Button
                    text={labels.mobileBtnText}
                    icon="Info"
                    iconPosition="left"
                    iconWidth="13"
                    iconHeight="13"
                    version="v2"
                    bg="dark"
                    color="white"
                    className="rounded-30 font-500 mini-text"
                    onClick={() => setIsMobileModalOpen(true)}
                />
            </div>

            <div className="flex sm-grid-cols-1 gap-12 items-start w-full py-40 sm-py-1">
                <div className="w-25 sm-hidden grid-cols-1 gap-12 h-500 overflow-auto sticky" style={{ top: stickyTop }}>
                    <SupplierSidebarContent
                        supplierInfo={supplierInfo}
                        labels={labels}
                        statsConfig={statsConfig}
                        trustPoints={trustPoints}
                        contactItemsConfig={contactItemsConfig}
                        onConnectClick={handleConnectClick}
                    />
                </div>

                <div className="w-75 sm-w-full sm-mt-20">
                    <Tab version="v1" tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                    {activeTab === 'catalog' && (
                        <div className="mt-20">
                            <div className="flex items-center justify-between gap-12 mb-16 flex-wrap">
                                <div className="w-50 sm-w-full">
                                    <Fields
                                        type="text"
                                        placeholder={labels.searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e?.target?.value ?? e ?? '');
                                            setCurrentPage(1);
                                        }}
                                        icon="Search"
                                        iconPosition="left"
                                        version="v1"
                                    />
                                </div>
                                <p className="mini-text text-gray font-500">
                                    {labels.showing} {displayedProducts.length} {labels.of} {validProducts.length} {labels.products}
                                </p>
                            </div>

                            {displayedProducts.length > 0 ? (
                                <>
                                    <div className="grid-cols-4 sm-grid-cols-2 gap-12">
                                        {paginatedProducts.map((product) => (
                                            <CardLayout
                                                key={product.id}
                                                version="product"
                                                item={product}
                                                isFluid={true}
                                                onClick={() => navigateToProduct(navigate, product)}
                                                onCategoryClick={(cat) => navigateToCategory(navigate, cat)}
                                            />
                                        ))}
                                    </div>

                                    {displayedProducts.length > ITEMS_PER_PAGE && (
                                        <div className="flex justify-center mt-30">
                                            <Pagination
                                                page={currentPage}
                                                totalItems={displayedProducts.length}
                                                itemsPerPage={ITEMS_PER_PAGE}
                                                onPageChange={setCurrentPage}
                                                itemName="products"
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white py-40 rounded-5 border-ec">
                                    <p className="small-text text-gray text-center capitalize font-500">{labels.noMatch}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="mt-20 grid-cols-1 gap-12">
                            <div className="bg-white border-ec p-24 rounded-5">
                                <div className="flex items-center justify-between flex-wrap gap-8 mb-12">
                                    <h4 className="mid-text font-600 text-dark">{labels.aboutPrefix} {supplierInfo.name}</h4>
                                    <span className="mini-text bg-forth px-10 py-4 rounded-20 text-gray font-500">
                                        {labels.estPrefix} {supplierInfo.established} • {supplierInfo.location}
                                    </span>
                                </div>
                                <p className="small-text text-gray font-400 leading-relaxed">{supplierInfo.about}</p>
                            </div>

                            <div className="bg-white border-ec p-20 rounded-5">
                                <h4 className="headmini-text font-600 text-dark mb-14">{labels.factsheetTitle}</h4>
                                <Table columns={specColumns} data={specData} showControls={false} minWidth="100%" />
                            </div>

                            {highlights.length > 0 && (
                                <div className="grid-cols-3 sm-grid-cols-1 gap-12 mt-4">
                                    {highlights.map((h, i) => (
                                        <div key={i} className="bg-forth p-20 rounded-5">
                                            <h5 className="headmini-text font-600 text-dark">{h.icon} {h.title}</h5>
                                            <p className="small-text text-gray mt-10 leading-relaxed">{h.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Modal
                type="sidebar"
                placement="left"
                size="sm"
                title={labels.mobileModalTitle}
                isOpen={isMobileModalOpen}
                onClose={handleCloseMobileModal}
            >
                <SupplierSidebarContent
                    supplierInfo={supplierInfo}
                    labels={labels}
                    statsConfig={statsConfig}
                    trustPoints={trustPoints}
                    contactItemsConfig={contactItemsConfig}
                    onConnectClick={() => {
                        handleCloseMobileModal();
                        handleConnectClick();
                    }}
                />
            </Modal>
        </div>
    );
};

export default memo(DetailSection);
