@isTest
public class TestRemoteClass {
    
     @isTest static void testVolumeIncrease() {
        RemoteClass rc = new RemoteClass(10);
        Integer newVolume = rc.IncreaseVolume(15);
        System.assertEquals(25, newVolume);
    }
    @isTest static void testVolumeDecrease() {
        RemoteClass rc = new RemoteClass(30);
        Integer newVolume = rc.DecreaseVolume(15);
        System.assertEquals(15, newVolume);
    }
    @isTest static void testVolumeMax() {
        RemoteClass rc = new RemoteClass(30);
        Integer newVolume = rc.IncreaseVolume(100);
        System.assertEquals(50, newVolume);
    }
    
    @isTest static void testVolumeMin() {
        RemoteClass rc = new RemoteClass(30);
        Integer newVolume = rc.DecreaseVolume(35);
        System.assertEquals(0, newVolume);
    }
    
}