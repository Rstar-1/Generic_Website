import React, { memo, useState, useCallback, useEffect } from "react";
import Modal from "../../common/Modal";
import Image from "../../common/Image";
import Icon from "../../common/Icon";
import Fields from "../../forms/Fields";
import FormBuilder from "../../forms/FormBuilder";
import Loader from "../../common/generic/Loader";
import { resolveImagePath } from "../../../utils/imageResolver";
import { sendEmail } from "../../../utils/emailsend";
import { useCart } from "../../../feature/slice/cartSlice";

const ENQUIRY_FIELDS = [
    {
        name: "phone",
        label: "Phone Number",
        placeholder: "Enter your 10-digit phone number",
        type: "tel",
        icon: "Phone",
        iconPosition: "left",
        validation: { required: true, mobile: true },
    },
];

const EnquiryModal = memo(
    ({
        isOpen = false,
        onClose,
        cartItems,
        items,
        onSetQuantity,
        onRemove,
        title = "Your cart",
        subtitle = "Review your selected items before proceeding to checkout.",
    }) => {
        const { clearCart } = useCart();
        const [formKey, setFormKey] = useState(0);
        const [isLoading, setIsLoading] = useState(false);
        const [isSubmitted, setIsSubmitted] = useState(false);

        const displayItems = items || cartItems || [];

        useEffect(() => {
            if (!isOpen) {
                setIsLoading(false);
                setIsSubmitted(false);
                setFormKey((prev) => prev + 1);
            }
        }, [isOpen]);

        const handleQtyChange = useCallback(
            (id, val) => {
                onSetQuantity?.(id, val);
            },
            [onSetQuantity]
        );

        const handleItemRemove = useCallback(
            (id) => {
                onRemove?.(id);
            },
            [onRemove]
        );

        const handleSubmit = useCallback(
            async (data) => {
                setIsLoading(true);
                const rawPhone = data?.phone || "";
                const cleanPhone = String(rawPhone).trim();
                const fullPhone = cleanPhone.startsWith("+") ? cleanPhone : `+91 ${cleanPhone}`;

                const itemsSummary = displayItems
                    .map((item, idx) => {
                        const itemPrice = Number(item.price) || 0;
                        const itemQty = item.quantity || 1;
                        const total = (itemPrice * itemQty).toFixed(2);
                        return `${idx + 1}. ${item.name} | Category: ${item.category || item.subCategory || "General"
                            } | Qty: ${itemQty} | Price: ₹${itemPrice} | Subtotal: ₹${total}`;
                    })
                    .join("\n");

                const totalPrice = displayItems.reduce(
                    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
                    0
                );

                const message = `Product Enquiry Details:\n\nPhone Number: ${fullPhone}\n\nSelected Products:\n${itemsSummary || "No specific items selected"
                    }\n\nTotal Estimated Amount: ₹${totalPrice.toFixed(2)}`;

                const emailData = {
                    ...data,
                    phone: fullPhone,
                    phone_number: fullPhone,
                    mobile: fullPhone,
                    products: itemsSummary,
                    total_price: `₹${totalPrice.toFixed(2)}`,
                    item_count: displayItems.length,
                    message: message,
                    subject: "New Product Enquiry",
                };

                try {
                    await sendEmail(emailData, "New Product Enquiry", message);
                } catch (err) {
                    console.error("Error sending enquiry email:", err);
                } finally {
                    setIsLoading(false);
                    setIsSubmitted(true);
                    clearCart?.();
                    setTimeout(() => {
                        setIsSubmitted(false);
                        setFormKey((prev) => prev + 1);
                        onClose?.();
                    }, 1800);
                }
            },
            [displayItems, clearCart, onClose]
        );

        return (
            <>
                {isLoading && <Loader />}
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size="xl"
                    title={
                        <div className="flex items-center gap-6">
                            <div className="bg-primary icon-lg rounded-5">
                                <Icon name="Bag" width="20" height="20" stroke="var(--white)" />
                            </div>
                            <div>
                                <h3 className="mid-text font-500 text-dark">{title}</h3>
                                <p className="mini-text text-gray text-muted font-400">{subtitle}</p>
                            </div>
                        </div>
                    }
                    footer={null}
                >
                    <div className="flex sm-flex-column-reverse items-start gap-12 py-10 w-full">
                        <div className="w-55 sm-w-full gap-12 overflow-auto h-350 sm-h-200 pr-6 sm-pr-1">
                            {displayItems.length > 0 ? (
                                <div className="grid-cols-1 gap-12">
                                    {displayItems.map((item) => (
                                        <div key={item.id} className="flex gap-12 items-center relative pb-20 bordb">
                                            <div className="w-35 h-100px rounded-5 overflow-hidden">
                                                <Image
                                                    src={resolveImagePath(item.image)}
                                                    alt={item.name}
                                                    className="flex w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="w-65">
                                                <p className="mini-text text-gray font-400">
                                                    {item.category || item.subCategory || "General"}
                                                </p>
                                                <h4 className="headmini-text text-dark font-600 line-clamp1">
                                                    {item.name}
                                                </h4>

                                                <div className="flex items-end justify-between mt-5">
                                                    <Fields
                                                        type="quantity"
                                                        value={item.quantity || 1}
                                                        onChange={(value) => handleQtyChange(item.id, value)}
                                                    />
                                                    <p className="small-text font-600 text-danger">
                                                        ₹{((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            {onRemove && (
                                                <div
                                                    onClick={() => handleItemRemove(item.id)}
                                                    className="absolute top-0 right-0 cursor-pointer"
                                                >
                                                    <Icon name="Close" width="16" height="16" stroke="var(--danger)" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-40 bg-forth rounded-5">
                                    <Icon
                                        name="Bag"
                                        width="36"
                                        height="36"
                                        stroke="var(--primary)"
                                        className="mx-auto mb-8"
                                    />
                                    <p className="small-text text-gray font-500">Your cart is empty</p>
                                </div>
                            )}
                        </div>

                        <div className="w-45 sm-w-full rounded-5 bg-forth">
                            <div className="p-16">
                                <div className="icon-lg bg-primary rounded-full mb-12">
                                    <Icon name="Mail" width="20" height="20" stroke="white" />
                                </div>
                                <h4 className="mid-text font-600 text-dark uppercase">Ashmita Vinyls</h4>
                                <p className="mini-text text-gray capitalize mt-4">
                                    by adding a few details of your requirement
                                </p>
                                <div className="mt-12">
                                    <FormBuilder
                                        key={formKey}
                                        version="1"
                                        fields={ENQUIRY_FIELDS}
                                        onSubmit={handleSubmit}
                                        submitType="json"
                                        col="1"
                                        submitText={isSubmitted ? "Enquiry Sent!" : "Submit"}
                                        buttonVersion="v3"
                                        buttonBg="primary"
                                        buttonColor="white"
                                        buttonClassName="mt-10 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

EnquiryModal.displayName = "EnquiryModal";

export { EnquiryModal };
export default EnquiryModal;
