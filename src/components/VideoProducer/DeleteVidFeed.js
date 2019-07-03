import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { connect } from 'react-redux';
import { deleteVidFeed } from '../redux/actions/dataAction';

const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '10%'
    }
  };

class DeleteVidFeed extends Component {
    state = {
        open : false
    }
    handleOpen =() =>{
        this.setState({open: true})
    }
    handleClose =() =>{
        this.setState({open: false})
    }
    deleteVidFeed =() =>{
        this.props.deleteVidFeed(this.props.vidFeedId)
        this.setState({open: false})
    }
    render() {
        const{classes}=  this.props
        return (
            <Fragment>
                <button tip="Delete Video"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}>
                    <DeleteOutlinedIcon color="secondary"/> 
                </button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                    Cancel
                            </Button>
                            <Button onClick={this.deleteVidFeed} color="secondary">
                                    Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

DeleteVidFeed.propsTypes ={
    deleteVidFeed: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    vidFeedId:PropTypes.string.isRequired
}

export default connect(null, {deleteVidFeed})(withStyles(styles)(DeleteVidFeed))
