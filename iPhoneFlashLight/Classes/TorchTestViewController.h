//
//  TorchTestViewController.h
//  TorchTest
//
//  Created by Darren Mason on 7/8/10.
//  Copyright TGen 2010. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@class AVCamDemoCaptureManager;

@interface TorchTestViewController : UIViewController {
	
	IBOutlet UISegmentedControl *torchSwitch;
	IBOutlet UISlider *strobeSlider;
	IBOutlet UISwitch *strobeButton;
	IBOutlet UILabel *timeLabel;
	AVCamDemoCaptureManager *captureManager;
	int toggle;
	float interval; 
	BOOL isLightOn;
	BOOL isStrobing;
	
}


@property(nonatomic,retain) UILabel *timeLabel;
@property(nonatomic,retain) UISwitch *strobeButton;
@property(nonatomic,retain) UISlider *strobeSlider;
@property (nonatomic,retain) AVCamDemoCaptureManager *captureManager;
@property(nonatomic,retain) UISegmentedControl *torchSwitch;
-(IBAction) toggleTorch:(id)sender;
-(IBAction) stobeEffect:(id)sender;
-(IBAction) setStrobInterval:(id)sender;
-(IBAction) stopStobEffect:(id)sender;
-(IBAction) changeLabelValue:(id)sender;

- (void)updateCounter:(NSTimer *)theTimer;

@end

