import React, { useState, useEffect } from "react";
import Icon from "./../common/Icon";


const Fields = ({
    type = "input",
    label,
    value,
    onChange,
    options = [],
    validation = {},
    length = 6,
    otpCount,
    border,
    position = "x",
    outline = true,
    style,
    className,
    icon,
    iconPosition = "right",
    error: propError,
    ...props
}) => {
    const [localError, setLocalError] = useState("");
    const error = propError !== undefined ? propError : localError;
    const setError = (val) => setLocalError(val);
    const [isFocused, setIsFocused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const otpRefs = React.useRef([]);
    const fileInputRef = React.useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    const [datepickerM, setDatepickerM] = useState(() => {
        const dateVal = typeof value === "string" ? value : (value?.fromDate || value?.toDate);
        const parsed = dateVal ? new Date(dateVal) : new Date();
        return !isNaN(parsed.getTime()) ? parsed.getMonth() : new Date().getMonth();
    });

    const [datepickerY, setDatepickerY] = useState(() => {
        const dateVal = typeof value === "string" ? value : (value?.fromDate || value?.toDate);
        const parsed = dateVal ? new Date(dateVal) : new Date();
        return !isNaN(parsed.getTime()) ? parsed.getFullYear() : new Date().getFullYear();
    });

    const clsInput = `${outline && !error && !isFocused ? "border-ec" : border ? "border-forth" : "border-0"
        } h-input rounded-5 text-gray w-full mini-text`;

    const clsBox = `${outline ? "border-ec" : border ? "border-forth" : "border-0"
        } relative w-full bg-white rounded-5`;

    useEffect(() => {
        if (!isOpen) return;
        const close = (e) => !e.target.closest(".dropdown-box") && setIsOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [isOpen]);

    const getOptLabel = (opt) => (opt && typeof opt === "object" ? opt.label : opt);
    const getOptValue = (opt) => (opt && typeof opt === "object" ? opt.value : opt);

    const getDisplayValue = () => {
        const isMulti = type === "multiselect";
        if (isMulti) {
            if (!value || !value.length) return "Select";
            const labels = value.slice(0, 2).map((val) => {
                const opt = options.find((o) => getOptValue(o) === val);
                return opt ? getOptLabel(opt) : val;
            });
            return labels.join(", ") + (value.length > 2 ? ` +${value.length - 2}` : "");
        } else {
            const opt = options.find((o) => getOptValue(o) === value);
            return opt ? getOptLabel(opt) : (value || "Select");
        }
    };

    const validate = (val) => {
        if (validation.required && !val) return "This field is required";
        if (validation.minLength && val?.length < validation.minLength) {
            return `Minimum ${validation.minLength} characters`;
        }
        if (validation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            return "Invalid Email";
        }
        return "";
    };

    const handleChange = (e) => {
        const val = e?.target?.type === "checkbox" ? e.target.checked : e?.target?.value;
        setError(validate(val));
        onChange?.(val);
    };

    const getInputStyle = () => ({
        padding: "10px 0px",
        textIndent: "12px",
        borderRadius: "8px",
        border: `1px solid ${error ? "var(--danger)" : isFocused ? "var(--secondary)" : outline ? "#ececec" : "var(--forth)"
            }`,
        fontSize: "13px",
        outline: "none",
        width: "100%",
        backgroundColor: "var(--white)",
        color: "var(--gray)",
    });

    const commonProps = {
        value: value || "",
        onChange: handleChange,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        style: { ...getInputStyle(), ...style },
        "aria-label": props["aria-label"] || label || undefined,
        ...props,
    };

    const monthss = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - 15 + i);
    const pad = (n) => String(n).padStart(2, "0");

    const changeDatepickerMonth = (offset) => {
        const date = new Date(datepickerY, datepickerM + offset, 1);
        setDatepickerM(date.getMonth());
        setDatepickerY(date.getFullYear());
    };

    const renderCalendarHeader = () => (
        <>
            <div className="grid-cols-2 gap-3 mb-8">
                <select
                    value={datepickerM}
                    onChange={(e) => setDatepickerM(Number(e.target.value))}
                    className="mini-text border-0 rounded px-2 py-2"
                >
                    {monthss.map((mm, i) => (
                        <option key={mm} value={i}>{mm}</option>
                    ))}
                </select>
                <select
                    value={datepickerY}
                    onChange={(e) => setDatepickerY(Number(e.target.value))}
                    className="mini-text border-0 rounded px-2 py-2"
                >
                    {years.map((yy) => (
                        <option key={yy} value={yy}>{yy}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-between mb-8">
                <div className="small-text text-gray font-500 cursor-pointer" onClick={() => changeDatepickerMonth(-1)}>◀</div>
                <p className="mini-text text-dark font-500">{monthss[datepickerM]} {datepickerY}</p>
                <div className="small-text text-gray font-500 cursor-pointer" onClick={() => changeDatepickerMonth(1)}>▶</div>
            </div>
        </>
    );

    const renderField = () => {
        const isInput = ["text", "input", "number", "email", "tel"].includes(type);
        if (isInput) {
            const inputType = type === "input" ? "text" : type;
            const isLeft = iconPosition === "left";
            return icon ? (
                <div className="relative w-full flex items-center overflow-hidden">
                    {isLeft && (
                        <div className="absolute left-0 text-gray flex items-center pointer-events-none p-10 mx-2 rounded-5">
                            <Icon name={icon} width="16" height="16" stroke="var(--gray)" />
                        </div>
                    )}
                    <input
                        type={inputType}
                        {...commonProps}
                        className={`${clsInput} ${className || ""}`}
                        style={{
                            ...commonProps.style,
                        }}
                    />
                    {!isLeft && (
                        <div className="absolute right-0 text-gray flex items-center pointer-events-none p-10 mx-2 rounded-5">
                            <Icon name={icon} width="16" height="16" stroke="var(--gray)" />
                        </div>
                    )}
                </div>
            ) : (
                <input
                    type={inputType}
                    {...commonProps}
                    className={`${clsInput} ${className || ""}`}
                />
            );
        }

        switch (type) {
            case "password":
                return (
                    <div className="relative w-full flex items-center overflow-hidden rounded-5">
                        <input
                            type={showPassword ? "text" : "password"}
                            {...commonProps}
                            className={`${clsInput} pr-12 ${className || ""}`}
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-0 right-0 p-10 bg-white cursor-pointer text-gray"
                        >
                            {showPassword ? (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            )}
                        </div>
                    </div>
                );

            case "range-datepicker": {
                const fromDate = value?.fromDate || "";
                const toDate = value?.toDate || "";
                const firstDayIndex = new Date(datepickerY, datepickerM, 1).getDay();
                const adjustedIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
                const totalDays = new Date(datepickerY, datepickerM + 1, 0).getDate();
                const dayss = [
                    ...Array(adjustedIndex).fill(""),
                    ...Array.from({ length: totalDays }, (_, i) => i + 1)
                ];

                return (
                    <div className={`dropdown-box ${clsBox}`} style={{ position: "relative" }}>
                        <div
                            className="flex items-center justify-between px-12 cursor-pointer h-select rounded-5"
                            onClick={() => {
                                if (!isOpen) {
                                    const dateToUse = fromDate || toDate;
                                    if (dateToUse) {
                                        const parsed = new Date(dateToUse);
                                        if (!isNaN(parsed.getTime())) {
                                            setDatepickerM(parsed.getMonth());
                                            setDatepickerY(parsed.getFullYear());
                                        }
                                    }
                                }
                                setIsOpen(!isOpen);
                            }}
                        >
                            <div className="w-10">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" className="cursor-pointer flex">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="mini-text text-gray font-500 w-40">
                                {fromDate ? fromDate.split("-").reverse().join(" / ") : "Start Date"}
                            </div>
                            <span className="mini-text text-gray w-10">➔</span>
                            <div className="mini-text text-gray font-500 w-40">
                                {toDate ? toDate.split("-").reverse().join(" / ") : "End Date"}
                            </div>
                        </div>

                        {isOpen && (
                            <div
                                className="absolute z-10 mt-4 bg-white rounded-5 p-12 w-full text-center"
                                style={{ top: "100%", left: 0 }}
                            >
                                {renderCalendarHeader()}
                                <div className="grid-cols-7">
                                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                                        <p className="mini-text text-dark font-500" key={d}>{d}</p>
                                    ))}

                                    {dayss.map((d, i) => {
                                        const cellDate = d ? `${datepickerY}-${pad(datepickerM + 1)}-${pad(d)}` : "";
                                        const isStart = fromDate && cellDate === fromDate;
                                        const isEnd = toDate && cellDate === toDate;
                                        const isInRange = d && fromDate && toDate &&
                                            new Date(cellDate) > new Date(fromDate) &&
                                            new Date(cellDate) < new Date(toDate);

                                        return (
                                            <p
                                                key={i}
                                                className={`mini-text font-500 flex items-center justify-center ${d ? "cursor-pointer" : ""}`}
                                                onClick={() => {
                                                    if (d) {
                                                        if (!fromDate || (fromDate && toDate)) {
                                                            onChange?.({ fromDate: cellDate, toDate: "" });
                                                        } else {
                                                            if (new Date(cellDate) < new Date(fromDate)) {
                                                                onChange?.({ fromDate: cellDate, toDate: "" });
                                                            } else {
                                                                onChange?.({ fromDate, toDate: cellDate });
                                                                setIsOpen(false);
                                                            }
                                                        }
                                                    }
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '36px',
                                                    background: isStart || isEnd
                                                        ? "var(--secondary)"
                                                        : isInRange
                                                            ? "rgba(99, 102, 241, 0.15)"
                                                            : "transparent",
                                                    color: isStart || isEnd
                                                        ? "var(--white)"
                                                        : d
                                                            ? "var(--gray)"
                                                            : "transparent",
                                                    borderRadius: 2,
                                                }}
                                            >
                                                {d}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            case "datepicker": {
                const firstDayIndex = new Date(datepickerY, datepickerM, 1).getDay();
                const totalDays = new Date(datepickerY, datepickerM + 1, 0).getDate();
                const dayss = [
                    ...Array(firstDayIndex).fill(""),
                    ...Array.from({ length: totalDays }, (_, i) => i + 1)
                ];

                return (
                    <div className={`dropdown-box ${clsBox}`} style={{ position: "relative" }}>
                        <div
                            className="flex items-center justify-between px-12 cursor-pointer h-select rounded-5"
                            onClick={() => {
                                if (!isOpen && value) {
                                    const parsed = new Date(value);
                                    if (!isNaN(parsed.getTime())) {
                                        setDatepickerM(parsed.getMonth());
                                        setDatepickerY(parsed.getFullYear());
                                    }
                                }
                                setIsOpen(!isOpen);
                            }}
                        >
                            <p className="mini-text text-gray line-clamp1">{value || "mm/dd/yyyy"}</p>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>

                        {isOpen && (
                            <div
                                className="absolute z-10 mt-4 bg-white rounded-5 p-12 w-full text-center"
                                style={{ top: "100%", left: 0 }}
                            >
                                {renderCalendarHeader()}
                                <div className="grid-cols-7 gap-4">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                        <p className="mini-text text-dark font-500" key={d}>{d}</p>
                                    ))}

                                    {dayss.map((d, i) => {
                                        const cellDate = d ? `${datepickerY}-${pad(datepickerM + 1)}-${pad(d)}` : "";
                                        const isSelected = d && value === cellDate;
                                        return (
                                            <p
                                                key={i}
                                                className={`mini-text font-500 flex items-center justify-center ${d ? "cursor-pointer" : ""}`}
                                                onClick={() => {
                                                    if (d) {
                                                        onChange?.(cellDate);
                                                        setIsOpen(false);
                                                    }
                                                }}
                                                style={{
                                                    width: '100%',
                                                    height: '36px',
                                                    background: isSelected ? "var(--secondary)" : "transparent",
                                                    color: isSelected ? "var(--white)" : d ? "var(--gray)" : "transparent",
                                                    borderRadius: 2,
                                                }}
                                            >
                                                {d}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

            case "color": {
                const hexValue = value || "#339af0";
                return (
                    <div className={`flex items-center gap-6 cursor-pointer ${clsBox} h-input`}>
                        <span
                            className="rounded-full ml-10"
                            style={{ width: "20px", height: "20px", backgroundColor: hexValue }}
                        />
                        <p className="mini-text text-gray uppercase font-500">{hexValue}</p>
                        <input
                            type="color"
                            value={hexValue}
                            onChange={handleChange}
                            className="absolute top-0 left-0 w-full h-full cursor-pointer"
                            style={{ opacity: 0 }}
                            aria-label={label || "Color picker"}
                        />
                    </div>
                );
            }

            case "textarea":
                return (
                    <textarea
                        {...commonProps}
                        style={{ ...getInputStyle(), resize: "vertical", minHeight: "90px" }}
                    />
                );

            case "checkbox": {
                if (!options || options.length === 0) {
                    return (
                        <div className="flex items-center gap-8 py-4">
                            <input
                                type="checkbox"
                                checked={!!value}
                                onChange={(e) => onChange?.(e.target.checked)}
                                className="cursor-pointer"
                            />
                        </div>
                    );
                }

                const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);
                return (
                    <div className={position === "y" ? "grid grid-cols-1 gap-12 py-4" : "flex items-center gap-12 py-4"}>
                        {options.map((opt) => {
                            const optLabel = getOptLabel(opt);
                            const optVal = getOptValue(opt);
                            const isChecked = selectedValues.includes(optVal);

                            return (
                                <label
                                    key={optVal}
                                    className="flex items-center gap-8 cursor-pointer"
                                    style={{ userSelect: "none" }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => {
                                            const nextValues = isChecked
                                                ? selectedValues.filter((v) => v !== optVal)
                                                : [...selectedValues, optVal];
                                            onChange?.(nextValues);
                                        }}
                                    />
                                    <p className="mini-text text-gray font-400">{optLabel}</p>
                                </label>
                            );
                        })}
                    </div>
                );
            }

            case "radio": {
                if (!options || options.length === 0) {
                    return (
                        <div className="flex items-center gap-8 py-4">
                            <input
                                type="radio"
                                checked={!!value}
                                onChange={(e) => onChange?.(e.target.checked)}
                                className="cursor-pointer"
                                style={{ width: "18px", height: "18px", accentColor: "#6366f1" }}
                            />
                        </div>
                    );
                }

                return (
                    <div className={position === "y" ? "grid-cols-1 gap-12 py-4" : "flex items-center gap-12 py-4"}>
                        {options.map((opt) => {
                            const optLabel = getOptLabel(opt);
                            const optVal = getOptValue(opt);
                            return (
                                <label
                                    key={optVal}
                                    className="flex items-center gap-8 cursor-pointer mini-text text-gray"
                                    style={{ userSelect: "none" }}
                                >
                                    <input
                                        type="radio"
                                        checked={value === optVal}
                                        onChange={() => onChange?.(optVal)}
                                        className="cursor-pointer"
                                        style={{ width: "18px", height: "18px", accentColor: "#6366f1" }}
                                    />
                                    <span>{optLabel}</span>
                                </label>
                            );
                        })}
                    </div>
                );
            }

            case "switch": {
                const isChecked = !!value;
                return (
                    <div
                        onClick={() => onChange?.(!isChecked)}
                        className={`relative cursor-pointer rounded-20 ${isChecked ? "bg-success" : "bg-gray"}`}
                        style={{
                            display: "inline-block",
                            width: "48px",
                            height: "26px",
                            transition: "background-color 0.2s ease-in-out",
                            marginTop: "4px",
                        }}
                    >
                        <span
                            className="absolute bg-white rounded-full"
                            style={{
                                top: "3px",
                                left: isChecked ? "25px" : "3px",
                                width: "20px",
                                height: "20px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                transition: "left 0.2s ease-in-out",
                            }}
                        />
                    </div>
                );
            }

            case "url":
                return (
                    <div className="flex items-center w-full relative">
                        <input
                            type="url"
                            {...commonProps}
                            style={value ? { paddingRight: "40px" } : undefined}
                            className={clsInput}
                        />
                        {value && (
                            <button
                                type="button"
                                onClick={() => {
                                    let targetUrl = value;
                                    if (!/^https?:\/\//i.test(targetUrl)) {
                                        targetUrl = `https://${targetUrl}`;
                                    }
                                    window.open(targetUrl, "_blank");
                                }}
                                className="absolute flex items-center justify-center cursor-pointer border-0 rounded-5"
                                style={{
                                    right: "10px",
                                    background: "none",
                                    color: "#6366f1",
                                    padding: "6px",
                                    transition: "all 0.15s ease-in-out",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#eef2ff";
                                    e.currentTarget.style.color = "#4f46e5";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#6366f1";
                                }}
                                title="Open link in new tab"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </button>
                        )}
                    </div>
                );

            case "file": {
                const hasFile = value && value.length > 0;
                const fileName = hasFile ? value[0].name : "No file chosen";
                return (
                    <div className={`flex items-center justify-between px-12 cursor-pointer ${clsBox} h-select relative overflow-hidden`}>
                        <span className="mini-text text-gray truncate pr-24">{fileName}</span>
                        <div className="flex items-center gap-4 text-gray mini-text font-medium relative z-10">
                            {hasFile ? (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onChange?.(null);
                                    }}
                                    className="flex items-center justify-center cursor-pointer border-0"
                                    style={{
                                        background: "none",
                                        color: "#9ca3af",
                                        padding: "4px",
                                        borderRadius: "4px",
                                        transition: "color 0.15s, background-color 0.15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#ef4444";
                                        e.currentTarget.style.backgroundColor = "#fee2e2";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#9ca3af";
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            ) : (
                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="file"
                            onChange={(e) => onChange?.(e.target.files)}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-0"
                            aria-label={label || "File upload"}
                        />
                    </div>
                );
            }

            case "dragfile":
                return (
                    <div
                        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                        onDrop={(e) => {
                            e.preventDefault(); e.stopPropagation(); setIsDragging(false);
                            if (e.dataTransfer.files?.length) onChange?.([...e.dataTransfer.files]);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className="text-center cursor-pointer"
                        style={{
                            border: isDragging ? "2px solid #4f46e5" : "2px dashed #6366f1",
                            backgroundColor: isDragging ? "#eef2ff" : "#f5f7ff",
                            borderRadius: "12px",
                            padding: "30px 20px",
                            color: "#4f46e5",
                            fontWeight: "500",
                            transition: "all 0.2s ease-in-out",
                            transform: isDragging ? "scale(1.01)" : "scale(1)",
                            boxShadow: isDragging ? "0 4px 12px rgba(99, 102, 241, 0.15)" : "none",
                        }}
                    >
                        <div className="flex flex-column items-center" style={{ pointerEvents: "none" }}>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "10px", color: "#6366f1" }}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <p className="small-text font-600" style={{ margin: "0 0 6px 0" }}>Drag & Drop Files here</p>
                            <p className="mini-text" style={{ margin: "0", color: "#6b7280" }}>
                                or <span style={{ textDecoration: "underline", color: "#6366f1" }}>click to browse</span> from file manager
                            </p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            onChange={(e) => { if (e.target.files?.length) onChange?.([...e.target.files]); }}
                            style={{ display: "none" }}
                            aria-label={label || "Drag and drop file upload"}
                        />
                        {value && Array.isArray(value) && value.length > 0 && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="flex flex-column gap-8"
                                style={{ marginTop: "16px", textAlign: "left", pointerEvents: "auto" }}
                            >
                                <div className="font-600" style={{ fontSize: "12px", color: "#4b5563" }}>
                                    Selected Files ({value.length})
                                </div>
                                {value.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white mini-text"
                                        style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 12px", color: "#1f2937" }}
                                    >
                                        <div className="flex items-center gap-8" style={{ overflow: "hidden" }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#6b7280", flexShrink: 0 }}>
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                <polyline points="14 2 14 8 20 8" />
                                            </svg>
                                            <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{file.name}</span>
                                            <span style={{ color: "#9ca3af", fontSize: "11px", flexShrink: 0 }}>({(file.size / 1024).toFixed(1)} KB)</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newFiles = [...value];
                                                newFiles.splice(index, 1);
                                                onChange?.(newFiles);
                                            }}
                                            className="flex items-center justify-center cursor-pointer border-0"
                                            style={{
                                                background: "none",
                                                color: "#9ca3af",
                                                padding: "4px",
                                                borderRadius: "4px",
                                                transition: "color 0.15s, background-color 0.15s",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#ef4444";
                                                e.currentTarget.style.backgroundColor = "#fee2e2";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "#9ca3af";
                                                e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "select":
            case "multiselect": {
                const isMulti = type === "multiselect";
                const showValue = getDisplayValue();

                return (
                    <div
                        className={`dropdown-box ${clsBox}`}
                        tabIndex={0}
                        onBlur={!isMulti ? () => setTimeout(() => setIsOpen(false), 100) : undefined}
                    >
                        <div
                            className="flex items-center justify-between px-8 cursor-pointer h-select rounded-5"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <p className="mini-text text-gray line-clamp1 capitalize">{showValue}</p>

                            {isMulti && value?.length ? (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    stroke="gray"
                                    strokeWidth="2"
                                    fill="none"
                                    className="cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); onChange?.([]); }}
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    stroke="gray"
                                    strokeWidth="2"
                                    fill="none"
                                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            )}
                        </div>

                        {isOpen && (
                            <div
                                className="absolute z-10 mt-4 w-full bg-white rounded-5 overflow-auto"
                                style={{ maxHeight: 200 }}
                            >
                                {options.map((opt) => {
                                    const optVal = getOptValue(opt);
                                    const optLabel = getOptLabel(opt);
                                    const isChecked = isMulti ? (value || []).includes(optVal) : value === optVal;

                                    return (
                                        <label
                                            key={optVal}
                                            className="flex items-center gap-6 p-12 cursor-pointer mini-text text-gray bordb capitalize"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => {
                                                    if (isMulti) {
                                                        const currentValues = value || [];
                                                        const nextValues = currentValues.includes(optVal)
                                                            ? currentValues.filter((v) => v !== optVal)
                                                            : [...currentValues, optVal];
                                                        onChange?.(nextValues);
                                                    } else {
                                                        onChange?.(optVal);
                                                        setIsOpen(false);
                                                    }
                                                }}
                                            />
                                            {optLabel}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            }

            case "quantity": {
                const quantityValue = value || 1;
                return (
                    <div
                        className="flex items-center justify-between bg-white border-ec rounded-5 px-5 h-select"
                        style={{ width: "130px" }}
                    >
                        <button
                            type="button"
                            onClick={() => onChange?.(Math.max(1, Number(quantityValue) - 1))}
                            className="center-div text-white rounded-5 bg-primary cursor-pointer border-0"
                            style={{ transition: "background-color 0.15s ease", flexShrink: 0 }}
                            aria-label="Decrease quantity"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>

                        <input
                            readOnly
                            value={quantityValue}
                            className="mini-text text-dark font-600 text-center border-0"
                            style={{ outline: "none", background: "transparent", width: "100%", minWidth: "0" }}
                            aria-label="Quantity"
                        />

                        <button
                            type="button"
                            onClick={() => onChange?.(Number(quantityValue) + 1)}
                            className="center-div text-white rounded-5 bg-primary cursor-pointer border-0"
                            style={{ transition: "background-color 0.15s ease", flexShrink: 0 }}
                            aria-label="Increase quantity"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                    </div>
                );
            }

            case "rating":
                return (
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <p
                                key={star}
                                className="cursor-pointer headpara-text"
                                style={{
                                    color: star <= value ? "#fbbf24" : "#d1d5db",
                                    transition: "color 0.15s ease-in-out"
                                }}
                                onClick={() => onChange?.(star)}
                            >
                                ★
                            </p>
                        ))}
                    </div>
                );

            case "otp": {
                const count = otpCount || length || 6;
                const otpArray = typeof value === "string" ? value.split("").slice(0, count) : [];
                return (
                    <div className="flex gap-10" style={{ padding: "4px 0" }}>
                        {Array.from({ length: count }).map((_, index) => {
                            const val = otpArray[index] || "";
                            return (
                                <input
                                    key={index}
                                    ref={(el) => { otpRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={val}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const pastedData = e.clipboardData.getData("text").trim().slice(0, count);
                                        if (/^\d+$/.test(pastedData)) {
                                            onChange?.(pastedData);
                                            const focusIndex = Math.min(pastedData.length, count - 1);
                                            otpRefs.current[focusIndex]?.focus();
                                        }
                                    }}
                                    onChange={(e) => {
                                        const char = e.target.value.slice(-1);
                                        if (char && !/^\d+$/.test(char)) return;
                                        const newOtpArray = [...otpArray];
                                        newOtpArray[index] = char;
                                        onChange?.(newOtpArray.join(""));
                                        if (char && index < count - 1) otpRefs.current[index + 1]?.focus();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace") {
                                            const newOtpArray = [...otpArray];
                                            if (e.target.value) {
                                                newOtpArray[index] = "";
                                                onChange?.(newOtpArray.join(""));
                                            } else if (index > 0) {
                                                newOtpArray[index - 1] = "";
                                                onChange?.(newOtpArray.join(""));
                                                otpRefs.current[index - 1]?.focus();
                                            }
                                        }
                                    }}
                                    className="text-center font-600 text-gray bg-white border-0 rounded-5 mini-text"
                                    style={{ width: "42px", height: "42px", outline: "none", transition: "all 0.2s" }}
                                    onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                                    onBlur={(e) => e.target.style.borderColor = "var(--gray)"}
                                />
                            );
                        })}
                    </div>
                );
            }

            case "slider":
            case "range": {
                const min = props.min !== undefined ? props.min : 0;
                const max = props.max !== undefined ? props.max : 100000;
                const step = props.step !== undefined ? props.step : 100;
                const val = typeof value === "number" ? value : Number(value) || max;
                const percentage = ((val - min) / (max - min)) * 100;
                const trackBg = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, #f1f5f9 ${percentage}%, #f1f5f9 100%)`;

                return (
                    <div className="py-4 w-full">
                        <style>{`
              .custom-slider-input {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 9999px;
                outline: none;
                transition: background 0.1s ease;
              }
              .custom-slider-input::-webkit-slider-runnable-track {
                width: 100%;
                height: 6px;
                cursor: pointer;
                border-radius: 9999px;
                background: transparent;
              }
              .custom-slider-input::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--primary);
                border: 2.5px solid #ffffff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                margin-top: -5px;
                transition: transform 0.1s ease, background-color 0.1s ease;
              }
              .custom-slider-input::-webkit-slider-thumb:hover { transform: scale(1.2); }
              .custom-slider-input::-webkit-slider-thumb:active { transform: scale(0.95); }
              .custom-slider-input::-moz-range-track {
                width: 100%;
                height: 6px;
                cursor: pointer;
                border-radius: 9999px;
                background: transparent;
              }
              .custom-slider-input::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--primary);
                border: 2.5px solid #ffffff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                transition: transform 0.1s ease;
              }
              .custom-slider-input::-moz-range-thumb:hover { transform: scale(1.2); }
            `}</style>
                        <div className="flex justify-between items-center mb-6">
                            <span className="mini-text text-gray font-400">₹{min}</span>
                            <span className="mini-text text-primary font-600">Up to ₹{val.toLocaleString()}</span>
                            <span className="mini-text text-gray font-400">₹{max.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            step={step}
                            value={val}
                            onChange={(e) => onChange?.(Number(e.target.value))}
                            className="custom-slider-input"
                            style={{ background: trackBg }}
                            aria-label={label || "Price range filter"}
                        />
                    </div>
                );
            }

            default:
                return null;
        }
    };

    return (
        <div className="w-full grid-cols-1">
            {label && (
                <label className="mini-text font-500 text-gray">
                    {label}
                </label>
            )}
            {renderField()}
            {error && <small className="text-danger mt-2 mini-text">{error}</small>}
        </div>
    );
};

export default Fields;