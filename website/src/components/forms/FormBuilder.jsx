import { useMemo, useState } from 'react';
import Fields from "./Fields";
import Button from "../common/Button";

const FormBuilder = ({
    fields = [],
    onSubmit,
    submitType = "formdata",
    col = "1",
    submitText = "Save Changes",
    buttonVersion = "v2",
    buttonBg = "primary",
    buttonClassName = "",
    children
}) => {
    const getDefaultValue = (field) => {
        if (field.defaultValue !== undefined) return field.defaultValue;
        return {
            "range-datepicker": { fromDate: "", toDate: "" },
            multiselect: [],
            quantity: 1,
            rating: 0,
            checkbox: false,
            radio: false,
            switch: false,
        }[field.type] ?? "";
    };

    const initialValues = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = getDefaultValue(field);
            return acc;
        }, {});
    }, [fields]);

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validateField = (field, val) => {
        const { required, minLength, email, mobile } = field.validation || {};
        if (required && (val === null || val === undefined || val === "" || (typeof val === "string" && !val.trim()) || (Array.isArray(val) && !val.length))) {
            return "This field is required";
        }
        if (minLength && typeof val === "string" && val.length < minLength) {
            return `Minimum ${minLength} characters`;
        }
        if ((field.type === "email" || field.name === "email" || email) && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            return "Invalid Email Address";
        }
        if ((field.type === "tel" || field.name === "mobile" || mobile) && val && !/^[6-9]\d{9}$/.test(val)) {
            return "Enter a valid 10-digit mobile number";
        }
        return "";
    };

    const handleChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        const field = fields.find((f) => f.name === name);
        if (field) {
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(field, value),
            }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {};
        let isValid = true;

        fields.forEach((field) => {
            const err = validateField(field, form[field.name]);
            if (err) {
                newErrors[field.name] = err;
                isValid = false;
            }
        });

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        if (submitType === "json") {
            onSubmit?.(form);
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (val === null || val === undefined) return;
            if (val instanceof FileList || Array.isArray(val)) {
                Array.from(val).forEach((item) => formData.append(key, item));
            } else if (typeof val === "object" && !(val instanceof File)) {
                formData.append(key, JSON.stringify(val));
            } else {
                formData.append(key, val);
            }
        });
        onSubmit?.(formData);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="w-full"
        >
            <div className={`grid-cols-${col} gap-12 items-start`}>
                {fields.map((field) => (
                    <Fields
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        error={errors[field.name]}
                        onChange={(value) => handleChange(field.name, value)}
                    />
                ))}
            </div>

            {children}

            <div className={buttonClassName || "flex justify-center mt-20"}>
                <Button
                    type="submit"
                    version={buttonVersion}
                    bg={buttonBg}
                >
                    {submitText}
                </Button>
            </div>
        </form>
    );
};

export default FormBuilder;