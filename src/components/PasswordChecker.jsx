import React, { useState } from "react";

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const strengthPassword = evaluateStrength(password);
  return (
    <div className="h-screen w-full bg-gray-800 text-gray-200 flex flex-col justify-center items-center font-mono">
      <h2 className="text-2xl mb-3">Password Strength Checker</h2>
      <PasswordInput value={password} onChange={setPassword} />
      <PasswordStrength strength={strengthPassword} />
      <PasswordValidation password={password} />
    </div>
  );
}

function PasswordInput({ value, onChange }) {
  return (
    <input
      type="password"
      placeholder="Enter Password"
      className="bg-slate-600 text-xl py-2 px-4 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function PasswordStrength({ strength }) {
  const colors = {
    weak: "text-red-500",
    medium: "text-yellow-500",
    strong: "text-green-500",
  };
  return (
    <div className="w-60 my-2">
      <p className={`${colors[strength]} capitalize`}>{strength} Password</p>
    </div>
  );
}

function evaluateStrength(password) {
  const checkPass = password.length;
  if (checkPass <= 4) return "weak";
  if (checkPass <= 7) return "medium";
  return "strong";
}

function PasswordValidation({ password }) {
  const requirements = [
    {
      label: "At least 8 character",
      met: hasMinimumLength(password),
    },
    {
      label: "Contains Number",
      met: hasNumber(password),
    },
    {
      label: "Contains Special Character",
      met: hasSpecialCharacter(password),
    },
    {
      label: "Contains Uppercase & Lowercase",
      met: hasUpperLower(password),
    },
  ];
  return (
    <div>
      <ul>
        {requirements.map(({ label, met }) => (
          <RequirementItem key={label} label={label} met={met} />
        ))}
      </ul>
    </div>
  );
}

function RequirementItem({ key, label, met }) {
  return (
    <li key={key} className={`${met ? "text-green-500" : "text-gray-500"}`}>
      {met ? "✓" : "•"} {label}
    </li>
  );
}

function hasMinimumLength(password) {
  return password.length >= 8;
}

function hasNumber(password) {
  return /\d/.test(password);
}

function hasSpecialCharacter(password) {
  return /[!@#$%^&*()_+<>?{}<>~|.,-=]/.test(password);
}

function hasUpperLower(password) {
  return /[a-z]/.test(password) && /[A-Z]/.test(password);
}
