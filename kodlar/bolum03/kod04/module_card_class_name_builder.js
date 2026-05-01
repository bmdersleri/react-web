function createModuleCardClassName(isActive) {
  const baseClass = "module-card";
  return isActive ? `${baseClass} ${baseClass}--active` : baseClass;
}

console.log(createModuleCardClassName(true));
