using UnityEngine;

[RequireComponent(typeof(AudioSource))]
public class AudioController : MonoBehaviour
{
    [SerializeField]
    AudioClip trackingFound;

    [SerializeField]
    AudioClip trackingLost;

    AudioSource audioSource;
    void Start()
    {
        audioSource = GetComponent<AudioSource>();
    }

    public void PlayFoundSound() {
        audioSource.PlayOneShot(trackingFound);
    }

    public void PlayLostSound() {
        audioSource.PlayOneShot(trackingLost);
    }
}
