import {React, useState, useEffect} from 'react';
import './regular.css';
import QueryFooter from '../footer/QueryFooter';
import useDogModel from './dogModel';
import ProgressBar from '../progressbar/ProgressBar';

function DogBodyConditionPage() {
  const [isLoading, setIsLoading] = useState(true);
	const { dogDataModel, loading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  var bodyCondition = dogData?.bodyCondition || '3';

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleBodyConditionChange = (bodyConditionId) => {
    setDogData({...dogData, bodyConditionId: bodyConditionId});
	bodyCondition = bodyConditionId;
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
          <ProgressBar progress={18} />{/* Update progress to reflect page position */}
          <h1>Describe {dogDataModel?.name}'s body condition</h1>
          <p>Select the option that best describes your dog's body condition.</p>

          <div class="vsp-div-radioslider">
            <div class="k-widget k-slider k-slider-horizontal vsp-kendo-slider conditionSlider14 k-state-default">
              <div class="k-slider-wrap">
                <ul class="k-reset k-slider-items">
                  <li class="k-tick k-first" role="presentation" title="1" style={{ width: '12.5%' }} onClick={() => handleBodyConditionChange('1')}>&nbsp;</li>
                  <li class="k-tick" role="presentation" title="2" style={{ width: '25%' }} onClick={() => handleBodyConditionChange('2')}>&nbsp;</li>
                  <li class="k-tick" role="presentation" title="3" style={{ width: '25%' }} onClick={() => handleBodyConditionChange('3')}>&nbsp;</li>
                  <li class="k-tick" role="presentation" title="4" style={{ width: '25%' }} onClick={() => handleBodyConditionChange('4')}>&nbsp;</li>
                  <li class="k-tick k-last" role="presentation" title="5" style={{ width: '12.5%' }} onClick={() => handleBodyConditionChange('5')}>&nbsp;</li>
                </ul>
                <div class="k-slider-track" style={{ width: '100%' }}>
                  <div href="#" class="k-draghandle" title="drag" role="slider" aria-valuemin="1" aria-valuemax="5" aria-valuenow="3" tabindex="0" data-role="draggable" aria-valuetext="3" style={{ left: `${(bodyCondition - 1) * 25 - 1}%` }}></div>
                </div>
                {/* <input id="sliderkendo2287" class="vsp-kendo-slider conditionSlider14" value="0" title="Body Condition" questionid="14" questionblockid="0" questionnairequestionid="2287" type="text" data-role="slider" autocomplete="off" style={{display: 'none'}} /> */}
              </div>
            </div>

            <div class="vsp-div-radioslider-bottom-item" style={{ display: 'flex', flexWrap: 'wrap', width: '95%' }}>

              <div class={`vsp-bottom-condition-1-5 vsp-bottom-condition-${bodyCondition === '1' ? 'selected' : 'notselected'}`} onClick={() => handleBodyConditionChange('1')} runningtext="very thin and needs to gain several pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} data-val="sdsdsdxxxxx" initialvalue="Very Thin" class="vsp-slider-answertext  ">Very Thin</div>
                  <div style={{ display: 'block' }} initialvalue="Possible loss of muscle, needs to gain weight " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div class="vsp-subimg-mobile">
                      <img class="vsp-condition-item-image condition" src="./img/dogfitness/overlight.png" />
                    </div>
                    <div>
                      Possible loss of muscle, needs to gain weight
                    </div>
                  </div>

                </div>
              </div>
              <div class={`vsp-bottom-condition-1-5 vsp-bottom-condition-${bodyCondition === '2' ? 'selected' : 'notselected'}`} onClick={() => handleBodyConditionChange('2')} runningtext="underweight and needs to gain a few pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} data-val="sdsdsdxxxxx" initialvalue="Underweight" class="vsp-slider-answertext  ">Underweight</div>
                  <div style={{ display: 'block' }} initialvalue="Ribs or vertebrae are visible " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div class="vsp-subimg-mobile">
                      <img class="vsp-condition-item-image condition" src="./img/dogfitness/light.png" />
                    </div>
                    <div>
                      Ribs or vertebrae are visible
                    </div>
                  </div>

                </div>
              </div>
              <div class={`vsp-bottom-condition-1-5 vsp-bottom-condition-${bodyCondition === '3' ? 'selected' : 'notselected'}`} onClick={() => handleBodyConditionChange('3')} runningtext="at a healthy weight and needs to maintain it" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} data-val="sdsdsdxxxxx" initialvalue="Just Right" class="vsp-slider-answertext  ">Just Right</div>
                  <div style={{ display: 'block' }} initialvalue="Ribs and vertebrae are easy to feel, waistline can be seen " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div class="vsp-subimg-mobile">
                      <img class="vsp-condition-item-image condition" src="./img/dogfitness/fine.png" />
                    </div>
                    <div>
                      Ribs and vertebrae are easy to feel, waistline can be seen
                    </div>
                  </div>

                </div>
              </div>
              <div class={`vsp-bottom-condition-1-5 vsp-bottom-condition-${bodyCondition === '4' ? 'selected' : 'notselected'}`} onClick={() => handleBodyConditionChange('4')} runningtext="overweight and needs to lose a few pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} data-val="sdsdsdxxxxx" initialvalue="Overweight" class="vsp-slider-answertext  ">Overweight</div>
                  <div style={{ display: 'block' }} initialvalue="Waistline not visible, stomach may be sagging " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div class="vsp-subimg-mobile">
                      <img class="vsp-condition-item-image condition" src="./img/dogfitness/fat.png" />
                    </div>
                    <div>
                      Waistline not visible, stomach may be sagging
                    </div>
                  </div>

                </div>
              </div>
              <div class={`vsp-bottom-condition-1-5 vsp-bottom-condition-${bodyCondition === '5' ? 'selected' : 'notselected'}`} onClick={() => handleBodyConditionChange('5')} runningtext="obese and needs to lose several pounds" questionid="14" questionblockid="0" questionnaireid="9" questionname="DogCondition" questiondisplayname="Condition">
                <div class="vsp-radio-slider-container">
                  <div style={{ display: 'block' }} data-val="sdsdsdxxxxx" initialvalue="Obese" class="vsp-slider-answertext  ">Obese</div>
                  <div style={{ display: 'block' }} initialvalue="Visible rolls, needs to lose weight " class="vsp-radio-helptext vsp-subtext-mobile p-xsmall  ">
                    <div class="vsp-subimg-mobile">
                      <img class="vsp-condition-item-image condition" src="./img/dogfitness/overfat.png" />
                    </div>
                    <div>
                      Visible rolls, needs to lose weight
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <QueryFooter saveDogData={saveChange} dogData={dogData} back={"/dog-weight-form"} next={"/dog-active-level-form"} />
    </div>
  );
}

export default DogBodyConditionPage;
