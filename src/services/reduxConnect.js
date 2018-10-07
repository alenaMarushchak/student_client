import { connect } from 'react-redux'

const mapStateToProps = (mapStateToProps, options) => {
  return connect(mapStateToProps, {});
};

const mapDispatchToProps = (mapDispatchToProps, options) => {
  const mapStateToProps = () => ({});
  return connect(mapStateToProps, mapDispatchToProps);
};

export {
  mapStateToProps,
  mapDispatchToProps
};
