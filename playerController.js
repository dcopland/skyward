#pragma strict

public var speed : float;
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;

//Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

function FixedUpdate() {
	transform.position.z = 0;

	//Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	//Handle Horz Movement
	GetComponent.<Rigidbody>().velocity.x = speed * Input.GetAxis("Horizontal");

		if(GetComponent.<Rigidbody>().velocity.x < 0) {
			//if we're moving to the left,
			targetRotation = 180; //set char to left.
		}

		else if(GetComponent.<Rigidbody>().velocity.x > 0) {
			//if we're moving to the right
			targetRotation = 0; //set char to right.
		}

		transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;

//handle jump
// if user hits jump key and we are on ground.

	if(Input.GetButton("Jump") && isGrounded()) {
		GetComponent.<Rigidbody>().velocity.y = jumpHeight;

	}

}

//run a check to see if the player is on the ground.

function isGrounded() {

	var front : Vector3 = transform.position;
	front.x += 0.4;

	var middle : Vector3 = transform.position;

	var back : Vector3 = transform.position;
	back.x-= 0.4;

	//debug raycast

	var jumpLine : float = GetComponent.<Collider>().bounds.size.y/2 + 0.2;
	Debug.DrawRay (middle, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (front, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (back, Vector3(0, -jumpLine, 0), Color.red);

	if(
	Physics.Raycast(front, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2) ||
	Physics.Raycast(middle, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2) ||
	Physics.Raycast(back, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2)
	){
	return true;
	}
	return false;
}		

function Start () {

}

function Update () {

}