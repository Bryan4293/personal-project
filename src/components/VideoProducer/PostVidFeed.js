import React, { Component , Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MyButton from '../../util/MyButton'

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { postVidFeed} from "../redux/actions/dataAction"

const styles = () => ({
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 10
    },
    progressSpinner: {
      position: 'absolute'
    },
    closeButton: {
      position: 'absolute',
      left: '91%',
      top: '6%'
    }
  });

class PostVidFeed extends Component {
    state={
        open: false,
        body:'',
        error:{}
    }

    handleOpen =()=>{
        this.setState({open: true})
    }
    handleClose =()=>{
        this.setState({open: false})
    }
    handleChange= (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
       e.preventDefault();
       this.props.postVidFeed({ body: this.state.body})
    }

    render() {
        const { error } = this.state;
    const {classes,UI: { loading }} = this.props;
        return (
            <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a video!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new video</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Hey. Video title here"
                multiline
                rows="3"
                error={error.body ? true : false}
                helperText={error.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}>
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}/>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
        )
    }
}

PostVidFeed.propTypes ={
    postVidFeed : PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
}

const mapStateToProps= (state) =>({
    UI: state.UI
})

export default connect(mapStateToProps, {postVidFeed})(withStyles(styles)(PostVidFeed))
