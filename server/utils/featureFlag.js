exports.featureFlag = ({ features }, feature) => {
  if (features.includes(feature)) {
    const index = features.indexOf(features);
    features.splice(index, 1);
  } else {
    features.push(feature);
  }
};
