import { useMemo, useState, useEffect } from 'react';
import Fields from "./Fields";
import Button from "../common/Button";

const FormBuilder = ({
    fields = [],
    values,
    onChange,
    onSubmit,
    submitType = "formdata",
    col = "1",
    submitText = "Save Changes",
    buttonVersion = "v2",
    buttonBg = "primary",
    buttonClassName = "",
    fieldClassName = "",
    children
}) => {
    const getDefaultValue = (field) => {
        if (field.value !== undefined) return field.value;
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

    useEffect(() => {
        setForm((prev) => {
            let changed = false;
            const next = { ...prev };
            fields.forEach((f) => {
                if (f.value !== undefined && f.value !== prev[f.name]) {
                    next[f.name] = f.value;
                    changed = true;
                }
            });
            if (values && typeof values === 'object') {
                Object.entries(values).forEach(([k, v]) => {
                    if (v !== undefined && v !== prev[k]) {
                        next[k] = v;
                        changed = true;
                    }
                });
            }
            return changed ? next : prev;
        });
    }, [fields, values]);

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
        const updated = {
            ...form,
            [name]: value,
        };
        setForm(updated);
        onChange?.(name, value, updated);

        const field = fields.find((f) => f.name === name);
        if (field) {
            field.onChange?.(value, updated);
            setErrors((prev) => ({
                ...prev,
                [name]: validateField(field, value),
            }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {};
        let isValid = true;
        const currentData = { ...form };
        fields.forEach((f) => {
            if (f.value !== undefined) {
                currentData[f.name] = f.value;
            }
        });

        fields.forEach((field) => {
            const err = validateField(field, currentData[field.name]);
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
            onSubmit?.(currentData);
            return;
        }

        const formData = new FormData();
        Object.entries(currentData).forEach(([key, val]) => {
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
                        value={field.value !== undefined ? field.value : form[field.name]}
                        error={errors[field.name]}
                        onChange={(value) => handleChange(field.name, value)}
                        className={fieldClassName}
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