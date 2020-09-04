using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Events;

public class MessageHandler
{
    public int id;
    public string seq;

    public String name;
    private JToken data;

    public static MessageHandler Deserialize(string message)
    {
        JObject m = JObject.Parse(message);
        MessageHandler handler = new MessageHandler(
            m.GetValue("id").Value<int>(),
            m.GetValue("seq").Value<string>(),
            m.GetValue("name").Value<string>(),
            m.GetValue("data")
        );
        return handler;
    }

    public T getData<T>()
    {
        return data.Value<T>();
    }

    public MessageHandler(int id, string seq, string name, JToken data)
    {
        this.id = id;
        this.seq = seq;
        this.name = name;
        this.data = data;
    }

    public void send(object data)
    {
        JObject o = JObject.FromObject(new
        {
            id = id,
            seq = "end",
            name = name,
            data = data
        });
        UnityMessageManager.Instance.SendMessageToRN(UnityMessageManager.MessagePrefix + o.ToString());
    }
}

public class UnityMessage
{
    public String name;
    public JObject data;
    public Action<object> callBack;
}

public class UnityMessageManager : MonoBehaviour
{
#if UNITY_IOS && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void onUnityMessage(string message);
#endif

    public const string MessagePrefix = "@UnityMessage@";

    private static int ID = 0;

    private static int generateId()
    {
        ID = ID + 1;
        return ID;
    }

    public static UnityMessageManager Instance { get; private set; }

    public delegate void MessageDelegate(string message);
    public event MessageDelegate OnMessage;

    public delegate void MessageHandlerDelegate(MessageHandler handler);
    public event MessageHandlerDelegate OnRNMessage;

    private Dictionary<int, UnityMessage> waitCallbackMessageMap = new Dictionary<int, UnityMessage>();

    public UnityEvent OnPlayMessage0;
    public UnityEvent OnPlayMessage1;
    public UnityEvent OnPlayMessage2;
    public UnityEvent OnPlayMessage3;
    public UnityEvent OnPlayMessage4;
    public UnityEvent OnPlayMessage5;
    public UnityEvent OnPlayMessage6;
    public UnityEvent OnPlayMessage7;
    public UnityEvent OnPlayMessage8;
    public UnityEvent OnPlayMessage9;
    public UnityEvent OnPlayMessage10;
    public UnityEvent OnPauseMessage;
    public UnityEvent OnStopMessage;

    void Awake()
    {
        UnityMessageManager.Instance.OnMessage += toggleVideoPlay;
    }

    void onDestroy()
    {
        UnityMessageManager.Instance.OnMessage -= toggleVideoPlay;
    }

    void toggleVideoPlay(string message)
    {
        Debug.Log("onMessage:" + message);
        if (message == "pause")
        {
            if (OnPauseMessage != null)
            {
                OnPauseMessage.Invoke();
            }
        }
        if (message.Contains("play"))
        {
			switch(message)
			{
				case "play0":
					if (OnPlayMessage0 != null)
					{
						OnPlayMessage0.Invoke();
					}
					break;
				case "play1":
					if (OnPlayMessage1 != null)
					{
						OnPlayMessage1.Invoke();
					}
					break;
				case "play2":
					if (OnPlayMessage2 != null)
					{
						OnPlayMessage2.Invoke();
					}
					break;
				case "play3":
					if (OnPlayMessage3 != null)
					{
						OnPlayMessage3.Invoke();
					}
					break;
				case "play4":
					if (OnPlayMessage4 != null)
					{
						OnPlayMessage4.Invoke();
					}
					break;
				case "play5":
					if (OnPlayMessage5 != null)
					{
						OnPlayMessage5.Invoke();
					}
					break;
				case "play6":
					if (OnPlayMessage6 != null)
					{
						OnPlayMessage6.Invoke();
					}
					break;
				case "play7":
					if (OnPlayMessage7 != null)
					{
						OnPlayMessage7.Invoke();
					}
					break;
				case "play8":
					if (OnPlayMessage8 != null)
					{
						OnPlayMessage8.Invoke();
					}
					break;
				case "play9":
					if (OnPlayMessage9 != null)
					{
						OnPlayMessage9.Invoke();
					}
					break;
				case "play10":
					if (OnPlayMessage10 != null)
					{
						OnPlayMessage10.Invoke();
					}
					break;
				default:
					// code block
					break;
			}
        }
        if (message == "stop")
        {
            if (OnStopMessage != null)
            {
                OnStopMessage.Invoke();
            }
        }
    }

    static UnityMessageManager()
    {
        GameObject go = new GameObject("UnityMessageManager");
        DontDestroyOnLoad(go);
        Instance = go.AddComponent<UnityMessageManager>();
    }


    public void SendMessageToRN(string message)
    {
        if (Application.platform == RuntimePlatform.Android)
        {
            using (AndroidJavaClass jc = new AndroidJavaClass("no.asmadsen.unity.view.UnityUtils"))
            {
                jc.CallStatic("onUnityMessage", message);
            }
        }
        else if (Application.platform == RuntimePlatform.IPhonePlayer)
        {
			#if UNITY_IOS && !UNITY_EDITOR
						Debug.Log("SendMessageToRN: " + message);
						onUnityMessage(message);
			#endif
        }
    }

    public void SendMessageToRN(UnityMessage message)
    {
        int id = generateId();
        if (message.callBack != null)
        {
            waitCallbackMessageMap.Add(id, message);
        }

        JObject o = JObject.FromObject(new
        {
            id = id,
            seq = message.callBack != null ? "start" : "",
            name = message.name,
            data = message.data
        });
        UnityMessageManager.Instance.SendMessageToRN(MessagePrefix + o.ToString());
    }

    void onMessage(string message)
    {
        if (OnMessage != null)
        {
            OnMessage(message);
        }
    }

    void onRNMessage(string message)
    {
        if (message.StartsWith(MessagePrefix))
        {
            message = message.Replace(MessagePrefix, "");
        }
        else
        {
            return;
        }

        MessageHandler handler = MessageHandler.Deserialize(message);
        if ("end".Equals(handler.seq))
        {
            // handle callback message
            UnityMessage m;
            if (waitCallbackMessageMap.TryGetValue(handler.id, out m))
            {
                waitCallbackMessageMap.Remove(handler.id);
                if (m.callBack != null)
                {
                    m.callBack(handler.getData<object>()); // todo
                }
            }
            return;
        }

        if (OnRNMessage != null)
        {
            OnRNMessage(handler);
        }
    }
}
