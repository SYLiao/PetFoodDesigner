import React, {useState, useEffect} from 'react';
import './regular.css';
import QueryFooter from '../footer/QueryFooter';
import useDogModel from './dogModel';
import ProgressBar from '../progressbar/ProgressBar';

function DogTreatPage() {
  const [isLoading, setIsLoading] = useState(true);
	const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var treatFrequency = dogData?.treatFrequency || '2';

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleTreatChange = (treatFrequencyNumber) => {
    setDogData({...dogData, treatFrequency: treatFrequencyNumber});
	  treatFrequency = treatFrequencyNumber;
  };

  const saveChange = (dogData) => {
    saveDogData(dogData);
  };

  return (
    <div className="query-page">
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={23} />
          <h1>How many treats does {dogDataModel?.name} get each day?</h1>

          <div class="vsp-div-radioslider">
            <div class="form-container vsp-div-radioslider-item" style={{ display: 'flex', width: '95%' }}>
              <div class="vsp-condition-notselected" style={{ flex: '1', margin: '2px', width: '33.333333333333336%' }}>
                <div class="vsp-radio-slider-image-container">
                  <img id="imgQA55_117" class="vsp-condition-item-image" srcorigraw="/images/dog/one_treat_teal.gif " srcorig="/images/dog/one_treat_teal.gif " alt1="VeryRarelyTreated" alt="" srcpostraw="/images/dog/one-treat-frame_0.gif" srcpost="/images/dog/one-treat-frame_0.gif" defaultimageurl="" defaultimageposturl="" onload="imageOnLoadQuestion(this);" onerror="imageOnErrorHelper(this, '');" srctype="srcpost" src="/images/dog/one-treat-frame_0.gif" loadstatus="undefined;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl" errorcount="0" />
                </div>
              </div>
              <div class="vsp-condition-notselected" style={{ flex: '1', margin: '2px', width: '33.333333333333336%' }}>
                <div class="vsp-radio-slider-image-container">
                  <img id="imgQA55_118" class="vsp-condition-item-image" srcorigraw="/images/dog/some_treats_teal.gif" srcorig="/images/dog/some_treats_teal.gif" alt1="FewTreats" alt="" srcpostraw="/images/dog/some-treats-frame_0.gif" srcpost="/images/dog/some-treats-frame_0.gif" defaultimageurl="" defaultimageposturl="" onload="imageOnLoadQuestion(this);" onerror="imageOnErrorHelper(this, '');" srctype="srcpost" src="/images/dog/some-treats-frame_0.gif" loadstatus="undefined;srcorig;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl" errorcount="0" />
                </div>
              </div>
              <div class="vsp-condition-selected" style={{ flex: '1', margin: '2px', width: '33.333333333333336%' }}>
                <div class="vsp-radio-slider-image-container">
                  <img id="imgQA55_119" class="vsp-condition-item-image" srcorigraw="/images/dog/many_treats_teal.gif" srcorig="/images/dog/many_treats_teal.gif" alt1="SeveralTreats" alt="" srcpostraw="/images/dog/many-treats-frame_0.gif" srcpost="/images/dog/many-treats-frame_0.gif" defaultimageurl="" defaultimageposturl="" onload="imageOnLoadQuestion(this);" onerror="imageOnErrorHelper(this, '');" srctype="srcorig" src="/images/dog/many_treats_teal.gif" loadstatus="undefined;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcpost;defaultimageurl;srcorig;defaultimageurl" errorcount="0" />
                </div>
              </div>
            </div>
            <div class="k-widget k-slider k-slider-horizontal vsp-kendo-slider conditionSlider14 k-state-default">
              <div class="k-slider-wrap">
                <ul class="k-reset k-slider-items">
                  <li class="k-tick k-first" role="presentation" title="1" style={{ width: '25%' }} onClick={() => handleTreatChange('1')}>&nbsp;</li>
                  <li class="k-tick" role="presentation" title="3" style={{ width: '50%' }} onClick={() => handleTreatChange('2')}>&nbsp;</li>
                  <li class="k-tick k-last" role="presentation" title="5" style={{ width: '25%' }} onClick={() => handleTreatChange('3')}>&nbsp;</li>
                </ul>
                <div class="k-slider-track" style={{ width: '100%' }}>
                  <a href="#" class="k-draghandle" title="drag" role="slider" style={{ left: `${(treatFrequency - 1) * 50 - 1}%` }}></a>
                </div>
              </div>
            </div>

            <div class="vsp-div-radioslider-bottom-item" style={{ display: 'flex', flexWrap: 'wrap', width: '95%' }}>

              <div class="vsp-bottom-condition-1-3 vsp-bottom-condition-notselected" onClick={() => handleTreatChange('1')} runningtext="very thin and needs to gain several pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} initialvalue="Possible loss of muscle, needs to gain weight " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div>
                      Very Rarely or Never
                    </div>
                  </div>

                </div>
              </div>
              <div class="vsp-bottom-condition-1-3 vsp-bottom-condition-notselected" onClick={() => handleTreatChange('2')} runningtext="underweight and needs to gain a few pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} initialvalue="Ribs or vertebrae are visible " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div>
                      A Few Every Day
                    </div>
                  </div>

                </div>
              </div>
              <div class="vsp-bottom-condition-1-3 vsp-bottom-condition-selected" onClick={() => handleTreatChange('3')} runningtext="at a healthy weight and needs to maintain it" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} initialvalue="Ribs and vertebrae are easy to feel, waistline can be seen " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div>
                      Multiple Treats Several Times Daily
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-active-level-form"} next={"/dog-health-issues-form"} />
        </div>
      )}
    </div>
  );
}

export default DogTreatPage;
