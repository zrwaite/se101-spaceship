# Example Code Blocks

```typescript
defenceUpdate() {
	if (!this.sensors?.target) return
	aimTurret(this.sensors.target.heading)
	fireTorpedo(0)
}
```

```typescript
navigationUpdate() {
	this.angle = getShipStatus('angle')
	this.angleSpeed = getShipStatus('angularVelocity')
	land()
}
```

```typescript
propulsionUpdate() {
	if (!this.navigation || !this.sensors?.target || !this.defence) return
	const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
	const angularForce = Math.abs(500 * headingDiff)
	const angularSpeedForce = this.navigation.angleSpeed * (headingDiff < 0 ? -10000 : 10000)
	const force = Math.min(angularForce + angularSpeedForce, 100)
	if (headingDiff < 0) {
		setThruster('clockwise', force)
		setThruster('counterClockwise', 0)
	} else {
		setThruster('counterClockwise', force)
		setThruster('clockwise', 0)
	}
	setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0)
}
```

```typescript
sensorsUpdate() {
	const scanResult = passiveScan()
	if (!(scanResult instanceof Error)) this.target = scanResult[0]
}
```
