//
//  TorchTestViewController.m
//  TorchTest
//
//  Created by Darren Mason on 7/8/10.
//  Copyright TGen 2010. All rights reserved.
//

#import "TorchTestViewController.h"
#import "AVCamDemoCaptureManager.h"

@implementation TorchTestViewController

@synthesize torchSwitch,strobeSlider,captureManager,strobeButton,timeLabel;


-(IBAction) toggleTorch:(id)sender{
	
	
	switch ([(UISegmentedControl *)sender selectedSegmentIndex]) {
        case 0:
			isLightOn =NO;
			[strobeButton setOn:NO];
            [[self captureManager] setTorchMode:AVCaptureTorchModeOff];
            break;
        case 1:
			isLightOn=YES;			
            [[self captureManager] setTorchMode:AVCaptureTorchModeOn];
            break;

    }

}

-(IBAction) stopStobEffect:(id)sender{
	isStrobing=NO;	
	[strobeButton setOn:NO];
}

-(IBAction) changeLabelValue:(id)sender{
	//NSLog(@"%f",[(UISlider*)sender value]);
	[timeLabel setText:[NSString stringWithFormat:@"%.2f second(s)", [(UISlider*)sender value]]];
	
}

-(IBAction) setStrobInterval:(id)sender{
	//NSLog(@"%f",[(UISlider*)sender value]);
	interval = [(UISlider*)sender value];

}

-(IBAction) stobeEffect:(id)sender{

	
	if([(UISwitch*)sender isOn ])
	{
		isStrobing=YES;
		toggle = AVCaptureTorchModeOn;
		torchSwitch.selectedSegmentIndex=toggle;
		
		[NSTimer scheduledTimerWithTimeInterval:interval target:self selector:@selector(updateCounter:) userInfo:nil repeats:YES];
	}
	else {
		isStrobing=NO;
		toggle = AVCaptureTorchModeOff;
	}

	
		
}

- (void)updateCounter:(NSTimer *)theTimer {
	
	if(!isStrobing || !isLightOn)
		[theTimer invalidate];
	
	if(isLightOn && isStrobing){
		if(toggle==AVCaptureTorchModeOn)
		{
			toggle = AVCaptureTorchModeOff;
			[[self captureManager] setTorchMode:AVCaptureTorchModeOff];
		}
		else 
		{
			toggle = AVCaptureTorchModeOn;
			[[self captureManager] setTorchMode:AVCaptureTorchModeOn];
		}
				
	}
	else if(!isLightOn)
	{
		toggle = AVCaptureTorchModeOff;
		[[self captureManager] setTorchMode:AVCaptureTorchModeOff];
	}
	else {
		toggle = AVCaptureTorchModeOn;
		[[self captureManager] setTorchMode:AVCaptureTorchModeOn];
	}

}




/*
// The designated initializer. Override to perform setup that is required before the view is loaded.
- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil {
    if ((self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil])) {
        // Custom initialization
    }
    return self;
}
*/

/*
// Implement loadView to create a view hierarchy programmatically, without using a nib.
- (void)loadView {
}
*/


// Implement viewDidLoad to do additional setup after loading the view, typically from a nib.
- (void)viewDidLoad {
    [super viewDidLoad];
	
	interval=1.0f;
	NSError *error;
	
	captureManager = [[AVCamDemoCaptureManager alloc] init];
    if ([captureManager setupSessionWithPreset:AVCaptureSessionPresetHigh error:&error]) {
        [self setCaptureManager:captureManager];
	}
	
	toggle = AVCaptureTorchModeOn;
	isLightOn=YES;			
	[[self captureManager] setTorchMode:AVCaptureTorchModeOn];
}


/*
// Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
*/

- (void)didReceiveMemoryWarning {
	// Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
	
	// Release any cached data, images, etc that aren't in use.
}

- (void)viewDidUnload {
	// Release any retained subviews of the main view.
	// e.g. self.myOutlet = nil;
}


- (void)dealloc {

	[timeLabel release];
	[strobeButton release];
	[captureManager release];
	[strobeSlider release];
	[torchSwitch release];
    [super dealloc];
}

@end
