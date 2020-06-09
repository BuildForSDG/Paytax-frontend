import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Success = ({taxid}) => {
    return (
      <div>
        <div className='flex_c_align_center'>
          <div className='success_div'>
            <div className='full_row success_text'>
              <h3>Account created successfully</h3>
            </div>
            <div className='full_row success_btn'>
              <Link to='/'>
                <button className='red_btn full_width_btn'>
                  Log in to your Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  Success.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    taxid: state.taxid,
  });

export default connect(mapStateToProps, null)(Success);
