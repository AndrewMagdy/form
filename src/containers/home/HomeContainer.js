import { connect } from "react-redux";
import HomeComponent from "../../components/home/HomeComponent";

const mapStateToProps = state => ({
  formState: state.form
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
